#!/usr/bin/env python3
"""BekaWpigułce — synchronizacja treści z Facebooka do strony (fb-content.js).

Pobiera posty strony (zdjęcia, albumy, filmy, rolki, wpisy tekstowe) przez
Graph API, zapisuje grafiki do img/fb/ i generuje plik fb-content.js, który
db.js wczytuje i wkłada do katalogu memów / wideoteki.

Uruchamianie:
  * GitHub Actions (.github/workflows/fb-sync.yml) — co ~10 minut, automatycznie.
  * Ręcznie:  FB_PAGE_TOKEN=... python tools/fb_sync.py [--full]   (FB_PAGE_ID opcjonalne)

Tryby:
  (domyślny)        ostatnie ~50 postów + 25 rolek, scalane z tym, co już jest
  --full            cała historia strony (pierwsze wypełnienie)
  --raw-out PLIK    zapisz surową odpowiedź Graph API (bez tokenu) i
  --no-build        ... nie buduj strony (do pobrania danych na innej maszynie)
  --raw-in PLIK     zbuduj stronę z wcześniej zapisanej odpowiedzi (bez sieci do Graph)

Token NIGDY nie trafia do plików wynikowych ani do logów. Biblioteka
standardowa + opcjonalnie Pillow (zmniejsza grafiki do 1080 px).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_JS = ROOT / "fb-content.js"
IMG_DIR = ROOT / "img" / "fb"
GRAPH = "https://graph.facebook.com"
VERSION = os.getenv("FB_GRAPH_VERSION", "v26.0")
UA = {"User-Agent": "BekaWpigulceSiteSync/1.0"}
MAX_IMG_W = 1080
DEFAULT_PAGE_ID = "1282869891751448"  # BekaWpigułce (ID publiczne)

POST_FIELDS = (
    "id,created_time,message,permalink_url,full_picture,status_type,"
    "attachments{media_type,type,url,title,description,media{image{src,width,height},source},"
    "target{id,url},subattachments.limit(20){media_type,type,media{image{src,width,height}},target{id,url}}}"
)
REEL_FIELDS = "id,post_id,created_time,description,permalink_url,length,thumbnails{uri,is_preferred,width}"


# ----------------------------------------------------------------- Graph API
class GraphError(RuntimeError):
    pass


def _get(url: str) -> dict:
    req = urllib.request.Request(url, headers=UA)
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            msg = json.loads(body).get("error", {}).get("message", body)
        except ValueError:
            msg = body
        raise GraphError(f"Graph API HTTP {e.code}: {msg[:300]}") from None


def _paginate(path: str, params: dict, token: str, max_pages: int) -> list[dict]:
    q = dict(params, access_token=token)
    url = f"{GRAPH}/{VERSION}/{path}?{urllib.parse.urlencode(q)}"
    out: list[dict] = []
    for _ in range(max_pages):
        page = _get(url)
        out.extend(page.get("data") or [])
        url = (page.get("paging") or {}).get("next")
        if not url:
            break
    return out


def _page_token_from_user(token: str, want_id: str) -> tuple[str, str, str] | None:
    """Gdy sekret to token UŻYTKOWNIKA: znajdź stronę BekaWpigułce w /me/accounts i weź jej token."""
    try:
        accts = _paginate("me/accounts", {"fields": "id,name,access_token", "limit": 100}, token, 5)
    except GraphError:
        return None  # token strony nie ma /accounts — to dobrze
    if not accts:
        # Strony w „nowym doświadczeniu" często nie pojawiają się w /me/accounts —
        # wtedy prosimy o token bezpośrednio z ID strony.
        try:
            p = _get(f"{GRAPH}/{VERSION}/{want_id or DEFAULT_PAGE_ID}?"
                     + urllib.parse.urlencode({"fields": "id,name,access_token", "access_token": token}))
        except GraphError as e:
            print(f"[uwaga] token strony z ID: {e}", file=sys.stderr)
            return None
        return (p["access_token"], str(p["id"]), p.get("name", "?")) if p.get("access_token") else None
    pick = next((a for a in accts if want_id and str(a.get("id")) == want_id), None) \
        or next((a for a in accts if "bekawpigu" in _fold(a.get("name", "")).replace(" ", "")), None) \
        or (accts[0] if len(accts) == 1 else None)
    if not pick or not pick.get("access_token"):
        names = ", ".join(a.get("name", "?") for a in accts)
        raise GraphError(f"Token użytkownika nie wskazuje strony BekaWpigułce (strony: {names}). Ustaw zmienną FB_PAGE_ID.")
    return pick["access_token"], str(pick["id"]), pick.get("name", "?")


def _token_expiry(token: str) -> str:
    """Data wygaśnięcia sekretu (debug_token działa z tokenem dewelopera aplikacji)."""
    try:
        d = _get(f"{GRAPH}/{VERSION}/debug_token?" + urllib.parse.urlencode({"input_token": token, "access_token": token}))
        exp = int((d.get("data") or {}).get("expires_at") or 0)
    except (GraphError, ValueError):
        return "nieznana"
    if not exp:
        return "nigdy"
    when = datetime.fromtimestamp(exp, timezone.utc)
    days = (when - datetime.now(timezone.utc)).total_seconds() / 86400
    if days < 7:
        print(f"::warning::Sekret FB_PAGE_TOKEN wygasa {when:%Y-%m-%d %H:%M} UTC — podmień go (FACEBOOK-SYNC.md).")
    return f"{when:%Y-%m-%d %H:%M} UTC"


def fetch_raw(page_id: str, token: str, full: bool) -> dict:
    print(f"Ważność sekretu FB_PAGE_TOKEN: {_token_expiry(token)}")
    page = _page_token_from_user(token, page_id)
    if page:
        token, page_id, name = page
        print(f"::warning::Sekret FB_PAGE_TOKEN to token UŻYTKOWNIKA — działa do daty powyżej. "
              f"Wklej token STRONY (FACEBOOK-SYNC.md), żeby synchronizacja działała bez końca.")
    else:
        # Z tokenem strony „me" oznacza samą stronę — ID nie jest wtedy wymagane.
        try:  # pole „category" mają tylko strony — konto użytkownika zwróci błąd
            me = _get(f"{GRAPH}/{VERSION}/{page_id or 'me'}?{urllib.parse.urlencode({'fields': 'id,name,category', 'access_token': token})}")
        except GraphError as e:
            if "category" in str(e):
                raise GraphError("FB_PAGE_TOKEN to token UŻYTKOWNIKA bez dostępu do strony BekaWpigułce. "
                                 "Wygeneruj token STRONY (FACEBOOK-SYNC.md) i podmień sekret.") from None
            raise
        page_id, name = str(me.get("id") or page_id), me.get("name", "?")
    print(f"Strona: {name} ({page_id})")
    posts = _paginate(f"{page_id}/posts", {"fields": POST_FIELDS, "limit": 50}, token, 200 if full else 1)
    try:
        reels = _paginate(f"{page_id}/video_reels", {"fields": REEL_FIELDS, "limit": 25}, token, 100 if full else 1)
    except GraphError as e:  # brak uprawnienia do rolek nie blokuje reszty
        print(f"[uwaga] rolki: {e}", file=sys.stderr)
        reels = []
    return {"page_id": page_id, "fetched_at": _now(), "full": full, "posts": posts, "reels": reels}


# ------------------------------------------------------------- klasyfikacja
CATEGORIES = [
    # slug, nazwa, słowa kluczowe (bez polskich znaków, małe litery; dopasowanie od początku słowa)
    ("zagadki", "Zagadki", ["zagadk", "policz", "ile ", "ilu ", "ktora ", "ktory ", "ktore ", "zgadnij", "odpowiedz",
                            "quiz", "psychotest", "test ", "wybierz", "co to za", "znajdz", "rozwiaz", "lamiglow",
                            "a czy b", "a) ", "litera", "imie", "pierwsza litera"]),
    ("nostalgia", "Nostalgia i PRL", ["prl", "lata 90", "lat 90", "lata 80", "lat 80", "90s", "dawniej", "kiedys",
                                      "nostalg", "dzieciak", "dziecinstw", "bareja", "komun", "za moich czasow",
                                      "starsze pokolenie", "z dawnych"]),
    ("auto", "Auta i drogi", ["auto", "aut ", "samoch", "diesel", "tdi", "kierowc", "drog", "korek", "mechanik",
                              "warsztat", "opon", "paliw", "prawo jazdy", "fotoradar", "parking", "off-road", "offroad",
                              "ciagnik", "traktor", "motor"]),
    ("zwierzeta", "Zwierzaki", ["pies", "psa ", "psy ", "psem", "kot ", "kota", "koty", "kotek", "zwierz", "krow",
                                "kura", "kury", "chomik", "papug", "kon ", "konia"]),
    ("rodzina", "Rodzina", ["mama", "mamy", "tata", "taty", "babci", "babcia", "dziadek", "dziadk", "tesciow", "zona",
                            "zony", "maz ", "meza", "dzieci", "rodzin", "ciocia", "wujek", "wesel", "slub", "randk",
                            "dziewczyn", "chlopak"]),
    ("praca", "Praca i szef", ["praca", "pracy", "szef", "robot", "wyplat", "urlop", "poniedzialek", "biur",
                               "kolega z pracy", "pracodaw", "zus", "podatk", "nadgodzin"]),
    ("internet", "Internet i technologia", ["internet", "telefon", "smartfon", "tiktok", "facebook", "chatgpt", " ai ",
                                            "sztuczn", "aplikac", "wifi", "wi-fi", "komputer", "shazam", "nawigac",
                                            "gps", "bateri", "ladowark"]),
]
DEFAULT_CAT = ("zycie", "Życie codzienne")


def _fold(s: str) -> str:
    s = (s or "").lower().replace("ł", "l")
    s = unicodedata.normalize("NFKD", s)
    return " " + "".join(c for c in s if not unicodedata.combining(c)) + " "


def classify(text: str, kind: str) -> str:
    t = _fold(text)
    for slug, _name, words in CATEGORIES:
        if slug == "zagadki" and kind == "video":
            continue  # zagadki to grafiki; filmy idą do kategorii tematycznych
        for w in words:
            # początek słowa: poprzedza spacja lub znak niebędący literą
            if re.search(r"(?<![a-z0-9])" + re.escape(w.strip()) + (r"(?![a-z0-9])" if w.endswith(" ") else ""), t):
                if slug == "zagadki" and "?" not in t and w.strip() in ("ile", "ilu", "ktora", "ktory", "ktore", "litera", "imie"):
                    continue  # „ile"/„która" liczą się jako zagadka tylko w pytaniu
                return slug
    return DEFAULT_CAT[0]


def tags_of(text: str) -> list[str]:
    return list(dict.fromkeys(m.lower() for m in re.findall(r"#(\w{2,30})", text or "")))[:5]


def title_of(text: str, kind: str) -> str:
    for line in (text or "").splitlines():
        line = re.sub(r"#\w+", "", line).strip(" -–—•\t")
        if len(line) >= 3:
            return line if len(line) <= 90 else line[:87].rsplit(" ", 1)[0] + "…"
    return {"video": "Rolka BekaWpigułce", "photo": "Grafika BekaWpigułce"}.get(kind, "Post BekaWpigułce")


# ---------------------------------------------------------------- normalizacja
def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _iso(fb_time: str | None) -> str:
    if not fb_time:
        return _now()
    try:
        return datetime.strptime(fb_time, "%Y-%m-%dT%H:%M:%S%z").astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        return fb_time


def _abs_fb(url: str | None) -> str:
    if not url:
        return ""
    return "https://www.facebook.com" + url if url.startswith("/") else url


def _best_thumb(reel: dict) -> str:
    th = (reel.get("thumbnails") or {}).get("data") or []
    pref = [t for t in th if t.get("is_preferred")] or sorted(th, key=lambda t: -(t.get("width") or 0))
    return (pref[0].get("uri") if pref else "") or ""


def normalize(raw: dict) -> list[dict]:
    page_id = raw["page_id"]
    items: dict[str, dict] = {}

    for p in raw.get("posts", []):
        pid = str(p.get("id") or "")
        if not pid:
            continue
        text = (p.get("message") or "").strip()
        att = ((p.get("attachments") or {}).get("data") or [{}])[0]
        atype = (att.get("type") or "").lower()
        mtype = (att.get("media_type") or "").lower()
        if atype in ("share", "event", "native_templates", "note", "fundraiser_for_story") and not p.get("full_picture"):
            continue
        if p.get("status_type") == "shared_story" and atype == "share":
            continue  # udostępniony cudzy link — to nie jest treść strony

        images: list[str] = []
        subs = ((att.get("subattachments") or {}).get("data")) or []
        for s in subs:
            src = (((s.get("media") or {}).get("image")) or {}).get("src")
            if src and (s.get("media_type") or s.get("type") or "").lower().startswith("photo"):
                images.append(src)
        main_src = (((att.get("media") or {}).get("image")) or {}).get("src") or p.get("full_picture")

        if "video" in mtype or "video" in atype or "reel" in atype:
            kind = "video"
            video_id = str(((att.get("target") or {}).get("id")) or "")
        elif images or "photo" in mtype or "photo" in atype or "album" in atype:
            kind = "photo"
            video_id = ""
            if not images and main_src:
                images = [main_src]
        elif text:
            kind = "text"
            video_id = ""
        else:
            continue

        items[pid] = {
            "id": pid,
            "kind": kind,
            "created_at": _iso(p.get("created_time")),
            "text": text,
            "url": _abs_fb(p.get("permalink_url")) or f"https://www.facebook.com/{pid}",
            "video_id": video_id,
            "length": None,
            "_img_src": images if kind == "photo" else ([main_src] if main_src else []),
        }

    for r in raw.get("reels", []):
        raw_pid = str(r.get("post_id") or r.get("id") or "")
        pid = raw_pid if "_" in raw_pid else f"{page_id}_{raw_pid}"
        it = items.get(pid)
        thumb = _best_thumb(r)
        rec = {
            "id": pid,
            "kind": "video",
            "created_at": _iso(r.get("created_time")) if r.get("created_time") else (it or {}).get("created_at", _now()),
            "text": (r.get("description") or (it or {}).get("text") or "").strip(),
            "url": _abs_fb(r.get("permalink_url")) or (it or {}).get("url") or f"https://www.facebook.com/reel/{r.get('id')}",
            "video_id": str(r.get("id") or ""),
            "length": float(r["length"]) if r.get("length") is not None else None,
            "_img_src": [thumb] if thumb else (it or {}).get("_img_src", []),
            "reel": True,
        }
        items[pid] = rec
    return list(items.values())


# ----------------------------------------------------------------- grafiki
def _safe(pid: str) -> str:
    return re.sub(r"[^0-9A-Za-z_]", "_", pid)


def save_image(src: str, name: str) -> str | None:
    """Zapisuje grafikę jako img/fb/<name>.jpg (max 1080 px). Zwraca ścieżkę względną."""
    rel = f"img/fb/{name}.jpg"
    dst = ROOT / rel
    if dst.exists() and dst.stat().st_size > 0:
        return rel
    try:
        with urllib.request.urlopen(urllib.request.Request(src, headers=UA), timeout=60) as r:
            data = r.read()
    except Exception as e:  # noqa: BLE001 — pojedyncza grafika nie może zatrzymać synchronizacji
        print(f"[uwaga] nie pobrano grafiki {name}: {e}", file=sys.stderr)
        return None
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    try:
        from io import BytesIO

        from PIL import Image

        im = Image.open(BytesIO(data))
        im = im.convert("RGB")
        if im.width > MAX_IMG_W:
            im = im.resize((MAX_IMG_W, round(im.height * MAX_IMG_W / im.width)), Image.LANCZOS)
        im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    except ImportError:
        dst.write_bytes(data)
    except Exception as e:  # noqa: BLE001 — uszkodzony plik
        print(f"[uwaga] zła grafika {name}: {e}", file=sys.stderr)
        return None
    return rel


# ----------------------------------------------------------------- budowanie
def load_existing() -> dict:
    if not OUT_JS.exists():
        return {}
    txt = OUT_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.__BWP_FB__\s*=\s*(\{.*\});\s*$", txt, re.S)
    return json.loads(m.group(1)) if m else {}


def build(raw: dict) -> dict:
    fresh = normalize(raw)
    prev = load_existing()
    existing = {p["id"]: p for p in (prev.get("posts") or [])}
    if not fresh and existing:
        print("[uwaga] Facebook zwrócił 0 postów — zostawiam obecną treść bez zmian.", file=sys.stderr)
        return prev

    if raw.get("full"):
        merged: dict[str, dict] = {}
    else:
        # Okno pobrania: wszystko nowsze niż najstarszy pobrany post zastępujemy świeżymi danymi
        # (posty usunięte na FB w tym oknie znikają ze strony), starsze zostają bez zmian.
        oldest = min((p["created_at"] for p in fresh), default=None)
        merged = {k: v for k, v in existing.items() if oldest is None or v["created_at"] < oldest}

    for p in fresh:
        old = existing.get(p["id"]) or {}
        name = _safe(p["id"])
        imgs: list[str] = []
        for i, src in enumerate(p.pop("_img_src", [])[:10]):
            rel = save_image(src, name if i == 0 else f"{name}_{i + 1}") if src else None
            if rel:
                imgs.append(rel)
        if not imgs:
            imgs = old.get("images") or []
        kind = p["kind"]
        if kind == "photo" and not imgs:
            continue  # zdjęcie bez grafiki nie ma sensu na stronie
        p["images"] = imgs
        p["title"] = title_of(p["text"], kind)
        p["category"] = classify(p["text"], "video" if kind == "video" else "photo")
        p["tags"] = tags_of(p["text"])
        merged[p["id"]] = p

    # usuń osierocone grafiki (post skasowany na FB)
    keep = {Path(i).name for p in merged.values() for i in p.get("images", [])}
    if IMG_DIR.exists():
        for f in IMG_DIR.glob("*.jpg"):
            if f.name not in keep:
                f.unlink()

    posts = sorted(merged.values(), key=lambda p: p["created_at"], reverse=True)
    cats = [{"slug": s, "name": n} for s, n, _ in CATEGORIES] + [{"slug": DEFAULT_CAT[0], "name": DEFAULT_CAT[1]}]
    data = {
        "version": 1,
        "synced_at": raw.get("fetched_at") or _now(),
        "page_id": raw["page_id"],
        "categories": cats,
        "posts": posts,
    }
    if prev.get("posts") == posts and str(prev.get("page_id")) == str(data["page_id"]):
        return data  # bez zmian — nie nadpisujemy pliku (brak pustych commitów co 10 minut)
    body = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    OUT_JS.write_text(
        "/* BekaWpigułce — treść z Facebooka. Plik generuje tools/fb_sync.py (GitHub Actions).\n"
        "   NIE edytuj ręcznie — zmiany zostaną nadpisane przy następnej synchronizacji. */\n"
        f"window.__BWP_FB__ = {body};\n",
        encoding="utf-8",
    )
    return data


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--full", action="store_true", help="pobierz całą historię strony")
    ap.add_argument("--raw-in", type=Path)
    ap.add_argument("--raw-out", type=Path)
    ap.add_argument("--no-build", action="store_true")
    a = ap.parse_args()

    if a.raw_in:
        raw = json.loads(a.raw_in.read_text(encoding="utf-8"))
    else:
        page_id = os.getenv("FB_PAGE_ID", "").strip()  # opcjonalne — domyślnie strona tokenu
        token = os.getenv("FB_PAGE_TOKEN", "").strip()
        if not token:
            print("Brak FB_PAGE_TOKEN (sekret repozytorium) — pomijam synchronizację.", file=sys.stderr)
            return 0 if os.getenv("GITHUB_ACTIONS") else 2
        try:
            raw = fetch_raw(page_id, token, a.full)
        except GraphError as e:
            print(f"BŁĄD: {e}", file=sys.stderr)
            return 1
    if a.raw_out:
        a.raw_out.write_text(json.dumps(raw, ensure_ascii=False), encoding="utf-8")
    print(f"Graph API: {len(raw.get('posts', []))} postów, {len(raw.get('reels', []))} rolek")
    if a.no_build:
        return 0
    data = build(raw)
    kinds: dict[str, int] = {}
    cats: dict[str, int] = {}
    for p in data["posts"]:
        kinds[p["kind"]] = kinds.get(p["kind"], 0) + 1
        cats[p["category"]] = cats.get(p["category"], 0) + 1
    print(f"Strona: {len(data['posts'])} wpisów {kinds}; kategorie {cats}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

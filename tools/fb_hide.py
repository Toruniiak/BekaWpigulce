#!/usr/bin/env python3
"""BekaWpigułce — ukrywanie / przywracanie postów na osi czasu strony FB (NIGDY nie usuwa).

Ustawia flagę is_hidden w Graph API: post znika z osi czasu strony, ale zostaje na Facebooku
(z komentarzami i statystykami) i można go przywrócić tym samym narzędziem (ACTION=unhide).

Uruchamiane ręcznie z GitHub Actions (.github/workflows/fb-hide.yml).
Token: sekret FB_ADMIN_TOKEN (token użytkownika z uprawnieniem pages_manage_posts) lub FB_PAGE_TOKEN.
Domyślna lista ID: tools/fb_exclude.json (duplikaty, z których zostaje wersja z największym zasięgiem).
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
import fb_sync as fs  # noqa: E402


def post(path: str, data: dict) -> dict:
    req = urllib.request.Request(f"{fs.GRAPH}/{fs.VERSION}/{path}", data=urllib.parse.urlencode(data).encode(),
                                 headers=fs.UA, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", "replace")
        try:
            msg = json.loads(body).get("error", {}).get("message", body)
        except ValueError:
            msg = body
        raise fs.GraphError(f"HTTP {e.code}: {msg[:300]}") from None


def main() -> int:
    action = os.getenv("ACTION", "hide").strip()
    if action not in ("hide", "unhide"):
        print("ACTION musi być hide albo unhide")
        return 2
    ids = [i.strip() for i in os.getenv("POST_IDS", "").split(",") if i.strip()]
    if not ids:
        ids = json.loads(fs.EXCLUDE.read_text(encoding="utf-8")).get("ids") or []
    token = (os.getenv("FB_ADMIN_TOKEN") or os.getenv("FB_PAGE_TOKEN") or "").strip()
    page = fs._page_token_from_user(token, os.getenv("FB_PAGE_ID", "").strip())
    if page:
        token = page[0]
        print(f"Strona: {page[2]} ({page[1]})")
    ok = bad = 0
    for pid in ids:
        try:
            try:
                r = post(pid, {"is_hidden": "true" if action == "hide" else "false", "access_token": token})
            except fs.GraphError as e:
                if "posted by page itself" not in str(e):
                    raise
                # posty samej strony: ukrycie z osi czasu strony (post zostaje na FB)
                r = post(pid, {"timeline_visibility": "hidden" if action == "hide" else "normal", "access_token": token})
            ok += 1 if r.get("success", True) else 0
            print(f"{pid}: {'ukryty' if action == 'hide' else 'przywrócony'}")
        except fs.GraphError as e:
            bad += 1
            print(f"{pid}: BŁĄD {e}")
    print(f"Gotowe: {ok} OK, {bad} błędów (nic nie zostało usunięte).")
    return 1 if bad and not ok else 0


if __name__ == "__main__":
    sys.exit(main())

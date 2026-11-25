#!/usr/bin/env python3
"""BekaWpigułce — zasięgi i reakcje wybranych postów (do wyboru, który duplikat zostawić).

Uruchamiane w GitHub Actions (.github/workflows/fb-metrics.yml) z listą ID postów.
Wypisuje tabelę: ID, zasięg (jeśli Meta go udostępnia), wyświetlenia, reakcje, komentarze, udostępnienia.
Token: ten sam sekret FB_PAGE_TOKEN co synchronizacja. Niczego nie zmienia na Facebooku.
"""
from __future__ import annotations

import os
import sys
import urllib.parse

sys.path.insert(0, os.path.dirname(__file__))
import fb_sync as fs  # noqa: E402

REACH_METRICS = ["post_impressions_unique", "post_media_view", "post_total_media_view_unique", "post_impressions"]


def metric(pid: str, name: str, token: str):
    try:
        d = fs._get(f"{fs.GRAPH}/{fs.VERSION}/{pid}/insights?" + urllib.parse.urlencode({"metric": name, "access_token": token}))
        vals = (d.get("data") or [{}])[0].get("values") or [{}]
        v = vals[-1].get("value")
        return v if isinstance(v, (int, float)) else None
    except (fs.GraphError, IndexError):
        return None


def main() -> int:
    ids = [i.strip() for i in os.getenv("POST_IDS", "").split(",") if i.strip()]
    token = os.getenv("FB_PAGE_TOKEN", "").strip()
    page = fs._page_token_from_user(token, os.getenv("FB_PAGE_ID", "").strip())
    if page:
        token = page[0]
    print("id;zasieg;wyswietlenia;reakcje;komentarze;udostepnienia")
    for pid in ids:
        try:
            b = fs._get(f"{fs.GRAPH}/{fs.VERSION}/{pid}?" + urllib.parse.urlencode({
                "fields": "reactions.summary(true).limit(0),comments.summary(true).limit(0),shares",
                "access_token": token}))
        except fs.GraphError as e:
            print(f"{pid};BLAD {e}")
            continue
        r = ((b.get("reactions") or {}).get("summary") or {}).get("total_count", 0)
        c = ((b.get("comments") or {}).get("summary") or {}).get("total_count", 0)
        s = (b.get("shares") or {}).get("count", 0)
        vals = {m: metric(pid, m, token) for m in REACH_METRICS}
        reach = vals["post_impressions_unique"] or vals["post_total_media_view_unique"]
        views = vals["post_media_view"] or vals["post_impressions"]
        print(f"{pid};{reach if reach is not None else ''};{views if views is not None else ''};{r};{c};{s}")
    return 0


if __name__ == "__main__":
    sys.exit(main())

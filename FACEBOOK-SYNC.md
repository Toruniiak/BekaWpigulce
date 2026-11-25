# Facebook → bekawpigulce.pl: automatyczna synchronizacja

Każdy post opublikowany na stronie FB **BekaWpigułce** sam trafia na bekawpigulce.pl:

| Na Facebooku | Na stronie |
|---|---|
| grafika / zdjęcie / album | **Memy** (zatwierdzone, autor BekaWpigułce, link „na Facebooku ↗") |
| grafika z pytaniem (zagadka, „ile…?", „która…?") | **Memy → Zagadki** + lista na stronie **Zagadki** |
| rolka / film | **Filmy** (odtwarzacz Facebooka w okienku, długość, oznaczenie „Rolka z FB") |
| wpis tekstowy | **Memy** (kafelek z tekstem) |

Posty są **sortowane automatycznie** w kategorie: Zagadki, Nostalgia i PRL, Auta i drogi,
Zwierzaki, Rodzina, Praca i szef, Internet i technologia, Życie codzienne (słowa kluczowe
w `tools/fb_sync.py`, lista `CATEGORIES`). Hashtagi z posta stają się tagami.

## Jak to działa

`.github/workflows/fb-sync.yml` (GitHub Actions) uruchamia się **co ~10 minut**
(GitHub potrafi to opóźnić do ~15–30 min w godzinach szczytu), pobiera nowe posty
przez Graph API, zapisuje grafiki do `img/fb/`, aktualizuje `fb-content.js`, robi commit
i odświeża GitHub Pages. Post usunięty na FB znika ze strony. Filmy nie są kopiowane
do repozytorium (byłoby za ciężkie) — odtwarza je oficjalny odtwarzacz Facebooka.

W panelu admina: **Pulpit** pokazuje liczbę postów z FB i czas ostatniej synchronizacji;
**Memy / Filmy → Usuń** ukrywa wybrany post FB na stronie (nie wraca przy kolejnej synchronizacji).

## Jednorazowa konfiguracja (ok. 5 minut, robisz Ty — token to sekret)

1. **Token strony** (nie wygasa):
   1. <https://developers.facebook.com/tools/explorer/> → wybierz swoją aplikację Meta →
      *User Token* z uprawnieniami `pages_show_list`, `pages_read_engagement`,
      `pages_read_user_content` → *Generate Access Token*.
   2. Kliknij ikonę ⓘ przy tokenie → *Open in Access Token Tool* → **Extend Access Token**
      i skopiuj długoterminowy token.
   3. Wróć do Explorera, wklej długoterminowy token, wykonaj zapytanie `me/accounts`
      i skopiuj pole `access_token` przy stronie **BekaWpigułce** — to token strony bez daty ważności.
2. **Sekret w GitHubie**: repozytorium `Toruniiak/BekaWpigulce` → *Settings* →
   *Secrets and variables* → *Actions* → **New repository secret**
   - Name: `FB_PAGE_TOKEN`
   - Secret: token strony z punktu 1.
3. **Pierwsze wypełnienie strony całą historią**: zakładka *Actions* →
   *Synchronizacja z Facebookiem* → **Run workflow** → zaznacz
   „Pobierz CAŁĄ historię strony” → *Run workflow*. Po 2–5 minutach cała treść
   z Facebooka jest na stronie; dalej działa samo.
4. **Połączenie w drugą stronę**: na Facebooku → strona BekaWpigułce → *Edytuj informacje*
   → *Witryna*: `https://bekawpigulce.pl`.

## Gdy coś nie działa

- *Actions → Synchronizacja z Facebookiem* → ostatnie uruchomienie → log kroku
  „Pobierz posty z Facebooka”. „Brak FB_PAGE_TOKEN” = nie dodano sekretu;
  „Graph API HTTP 190” = token wygasł/unieważniony (np. zmiana hasła FB) — powtórz punkt 1–2.
- Ręcznie lokalnie: `FB_PAGE_TOKEN=... python tools/fb_sync.py [--full]`.

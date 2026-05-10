# 🚀 Przewodnik Wdrożenia - Beka w Pigułce

## Szybki start (3 kroki)

### Krok 1: Przygotowanie kodu
```bash
# Upewnij się, że masz zainstalowane zależności
npm install

# Sprawdź czy build działa
npm run build
```

### Krok 2: Utworzenie repozytorium GitHub
```bash
# Inicjalizacja git (jeśli jeszcze nie zrobione)
git init

# Dodanie wszystkich plików
git add .

# Commit
git commit -m "Initial commit - Beka w Pigułce ready for AdSense"

# Dodanie zdalnego repozytorium (zastąp TWOJA_NAZWA)
git remote add origin https://github.com/TWOJA_NAZWA/beka-w-pigulce.git

# Push
git branch -M main
git push -u origin main
```

### Krok 3: Włączenie GitHub Pages
1. Wejdź w swoje repozytorium na GitHub
2. Kliknij **Settings** (zakładka u góry)
3. W lewym menu kliknij **Pages**
4. W sekcji "Source" wybierz:
   - Branch: `main`
   - Folder: `/(root)`
5. Kliknij **Save**
6. Poczekaj 2-5 minut
7. Twoja strona będzie dostępna pod: `https://twanazwa.github.io/beka-w-pigulce/`

## ⚠️ WAŻNE - Przed zgłoszeniem do AdSense

### 1. Zaktualizuj plik ads.txt
Otwórz `public/ads.txt` i zamień:
```
google.com, pub-TWOJ_KOD_Z_ADSENSE, DIRECT, f08c47fec0942fa0
```

### 2. Zaktualizuj index.html
Znajdź i zamień w pliku `index.html`:
- `ca-pub-XXXXXXXXXXXXXXXX` → Twój prawdziwy kod AdSense
- `TWÓJ_KOD_WERYFIKACJI` → Kod z Google Search Console (opcjonalnie)

### 3. Zaktualizuj sitemap.xml
Zmień wszystkie adresy URL z `https://bekawpigulce.pl/` na swój prawdziwy adres.

### 4. Zrób commit zmian
```bash
git add .
git commit -m "Update AdSense codes and URLs"
git push
```

## 🔍 Weryfikacja po deploy

Sprawdź czy te adresy działają:
- [ ] `https://twanazwa.github.io/beka-w-pigulce/` - Strona główna
- [ ] `https://twanazwa.github.io/beka-w-pigulce/ads.txt` - Plik ads.txt (powinien wyświetlić tekst)
- [ ] `https://twanazwa.github.io/beka-w-pigulce/polityka-prywatnosci` - Polityka prywatności
- [ ] `https://twanazwa.github.io/beka-w-pigulce/regulamin` - Regulamin
- [ ] `https://twanazwa.github.io/beka-w-pigulce/kontakt` - Kontakt

## 📝 Rejestracja w Google AdSense

1. Wejdź na https://www.google.com/adsense
2. Kliknij "Rozpocznij"
3. Podaj URL swojej strony: `https://twanazwa.github.io/beka-w-pigulce/`
4. Wybierz język: Polski
5. Postępuj zgodnie z instrukcjami weryfikacji

## 🆘 Rozwiązywanie problemów

### "404 File not found" dla ads.txt
Upewnij się, że plik `ads.txt` jest w katalogu `public/` (nie w `src/`!).

Po pushu na GitHub, plik powinien być dostępny bezpośrednio pod:
`https://twanazwa.github.io/beka-w-pigulce/ads.txt`

### Strona się nie wyświetla
1. Wejdź w Settings → Pages w repozytorium
2. Sprawdź czy source jest ustawiony na `main` branch
3. Poczekaj 5 minut i odśwież (Ctrl+F5)

### Brak obrazków
Upewnij się, że folder `public/images/` został wypushowany na GitHub:
```bash
git add public/images/
git commit -m "Add images"
git push
```

## 🎉 Gratulacje!

Twoja strona jest teraz online i gotowa do zgłoszenia w Google AdSense!

Czas oczekiwania na akceptację: **1-30 dni** (zazwyczaj 1-2 tygodnie)

Pamiętaj o regularnym dodawaniu nowych treści podczas oczekiwania!

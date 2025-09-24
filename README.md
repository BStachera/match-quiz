# Match Quiz — szybki start

## Jak uruchomić lokalnie
1. Otwórz terminal w tym folderze.
2. Wpisz:
   ```bash
   python3 -m http.server 5500
   ```
3. Wejdź w przeglądarce na: http://localhost:5500

> Nie używaj `file:///…`, bo przeglądarka zablokuje Service Workera i część zasobów.

## Co poprawiłem
- Ujednoliciłem ścieżki skryptów w **index.html** (były `js/...`, a pliki są w głównym katalogu).
- Dodałem bezpieczną rejestrację Service Workera tylko na `http/https`.
- Naprawiłem moduły:
  - **game.js** już nie używa `import`; udostępnia `window.Game.viewGame`.
  - **creator.js** korzysta z `window.Utils`, eksportuje `window.Creator.viewCreator`.
- **sw.js** ignoruje żądania z protokołów innych niż `http/https` (np. `chrome-extension` w podglądach).
- CSP w **index.html** zezwala na style inline oraz fonty z `self` (możesz rozszerzyć wg potrzeb).

## Budowa
- `index.html` – UI + CSS + `<script>` w odpowiedniej kolejności.
- `utils.js`, `ui.js`, `questions.js` – narzędzia, UI i zestaw pytań.
- `creator.js` – kreator quizu i generator linku/QR.
- `game.js` – tryb gry i wynik.
- `app.js` – routing (hash), modal „o projekcie”, rejestracja SW.
- `sw.js` – prosty cache: network-first dla dokumentów/skryptów, cache-first dla obrazów/fontów.
- `qrcode.min.js` – biblioteka do generowania QR.

## Deploy
Wystarczy statyczny hosting (Netlify, Vercel, GitHub Pages, dowolny serwer www). Nie wymaga Node/Builda.
Pamiętaj, że SW działa wyłącznie na `https` (albo na `http://localhost`).

Powodzenia! ✨

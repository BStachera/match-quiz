# Match Quiz — czy pasujemy?

Szybki, lekki **quiz do przełamywania lodów**. Ustaw imię, wybierz odpowiedzi w 3 pytaniach bazowych, dołóż 3 losowe (z puli 24) i — jeśli chcesz — **dodaj do 4 własnych pytań Tak/Nie**. Wygeneruj link albo **QR** i wyślij. Druga osoba odpowie — a system policzy procent zgodności.

- Demo (GitHub Pages): **https://bstachera.github.io/match-quiz/**
- Repozytorium: **https://github.com/BStachera/match-quiz.git**

## Po co to?
Pierwsze „hej” w apkach randkowych bywa niezręczne. Wspólna mini-gra obniża barierę i od razu daje temat: *„Serio wolisz sushi od pizzy?”*. To nie test zgodności — to **zabawa i pretekst do rozmowy**. Sprawdza się też wśród znajomych, jako żart lub wyzwanie.

## Funkcje
- **3 pytania bazowe** — zawsze obecne (jedzenie / podejście społ.-polityczne / pomysł na 1. spotkanie).
- **3 pytania losowe** — z puli **24**; przy każdym przycisk **„🎲 Wylosuj inne”** (podmienia tylko to jedno pytanie).
- **Własne pytania Tak/Nie** — do **4** sztuk.
- **Link + QR** — generowane lokalnie; QR można pobrać jako **1000×1000 PNG** z białym marginesem (idealny do wklejki na zdjęcie).
- **Walidacja kontaktu** — e-mail (`mailto:`), telefon (+/00, 9–12 cyfr), WhatsApp, Instagram, Facebook/Messenger, Telegram, Discord, TikTok, X/Twitter.
- **Wsteczna kompatybilność** — stare linki (z 5 stałymi pytaniami) nadal działają.
- **iOS UX** — brak auto-zoomu na inputach, bezpieczne obszary (notch), ciemne tło bez białych rogów.
- **Krótki hash** — kompresja LZ-String w `#` URL (bez serwera).

## Prywatność
- **Zero serwera** — wszystko liczone i generowane lokalnie w przeglądarce.
- W linku zapisujemy tylko to, co potrzebne do gry (imię, opcjonalny kontakt, zestaw pytań i odpowiedzi autora).
- Brak analityki, ciasteczek śledzących i ukrytych skryptów.

## Jak używać
1. Otwórz stronę: https://bstachera.github.io/match-quiz/
2. Wpisz imię, (opcjonalnie) kontakt.
3. Zaznacz odpowiedzi w 3 bazowych i 3 losowych pytaniach. Użyj „🎲 Wylosuj inne”, jeśli chcesz zmienić pojedyncze pytanie.
4. (Opcjonalnie) Dodaj do 4 własnych pytań **Tak/Nie**.
5. Kliknij **„Generuj link + QR”** — skopiuj link lub pobierz QR (1000×1000 PNG).
6. Wyślij link lub wstaw QR na zdjęcie — druga osoba odpowie, a wynik zgodności pojawi się od razu.

## Dewelopersko
- Projekt to **pojedynczy plik `index.html`** + `qrcode.min.js` (biblioteka QR od davidshimjs) + favicony/manifest (opcjonalnie).
- Nie ma bundlera ani zależności NPM. Zero serwera.
- Używamy **LZ-String (URI)** w inline <script> do kompresji stanu w hashu URL.

### Pliki

# 🇬🇷 Ελληνικά — Nauka Greckiego

Interaktywna aplikacja webowa do nauki języka greckiego od poziomu A0 do A1, stworzona z myślą o polskojęzycznych użytkownikach.

## ✨ Funkcje

- **12 lekcji tematycznych** — od powitań po złożone zdania i emocje
- **Alfabet grecki** — każda litera z wymową, przykładami i pułapkami dla Polaków
- **Dwuznaki (digraphs)** — αι, ει, μπ, ντ i inne z objaśnieniami
- **500+ najczęstszych słów** — pogrupowanych tematycznie (czasowniki, rzeczowniki, przyimki)
- **Wzorce słowotwórcze** — sufiksy `-είο`, `-ικός`, `-τής` i inne
- **Ćwiczenia interaktywne** — czytanie, dryl, teksty
- **Tryb ciemny** — przełączany jednym kliknięciem
- **Romanizacja z akcentami** — akcentowane samogłoski wyróżnione kolorem

## 🗂️ Kategorie fraz

Podstawy · Uprzejmości · Pytania · Kawiarnia · Zakupy · Pogoda · Czas · Emocje · Flirt · Komplementy · Przekleństwa · U lekarza · Na lotnisku · i więcej

## 🛠️ Tech stack

| Warstwa | Technologia |
|---|---|
| Frontend | React 19, Lucide React (ikony) |
| Build | Vite 6 |
| Serwer | Express 4 (Node.js) |
| Deploy | Docker → Google Cloud Run |

## 🚀 Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod `http://localhost:5173`.

## 🐳 Docker

```bash
docker build -t nauka-greckiego .
docker run -p 8080:8080 nauka-greckiego
```

## ☁️ Deploy na Google Cloud Run

Aplikacja jest skonfigurowana do automatycznego deployu z repozytorium GitHub:

1. Połącz repo z Cloud Run (*Deploy from repository*)
2. Cloud Run automatycznie wykryje `Dockerfile`
3. Serwer nasłuchuje na porcie `8080` (standard Cloud Run)

## 📁 Struktura projektu

```
├── src/
│   ├── main.jsx       # Główny komponent aplikacji (2274 linie)
│   └── index.jsx      # Punkt wejścia React
├── index.html         # HTML entry point
├── server.js          # Serwer Express (produkcja)
├── vite.config.js     # Konfiguracja Vite
├── Dockerfile         # Multi-stage build (node:22-alpine)
├── .dockerignore
└── package.json
```

## 📄 Licencja

Projekt prywatny.

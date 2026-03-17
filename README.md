# page

Uniwersalny starter WWW oparty o:

- frontend: React + Vite (SPA z routingiem)
- headless CMS: Strapi (panel admina w przegladarce, REST API)
- baza: Postgres (przez Docker)

Projekt jest przygotowany pod pelny workflow kontenerowy: lokalny dev i produkcja przez `docker compose`, plus publikacja obrazow do GHCR przez GitHub Actions.

## 1) Szybki start (dev przez Docker Compose)

1. Skopiuj zmienne:

```bash
cp .env.example .env
cp cms/.env.example cms/.env
```

2. Uruchom caly stack:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Adresy:

- frontend: [http://localhost:5173](http://localhost:5173)
- CMS (Strapi): [http://localhost:1337/admin](http://localhost:1337/admin)
- Postgres: `localhost:5432`

Przy pierwszym uruchomieniu wejdź na `/admin` i utworz konto administratora.

## 2) Produkcja przez Docker Compose

```bash
cp .env.example .env
docker compose up --build -d
```

Adresy:

- frontend: [http://localhost](http://localhost)
- CMS: [http://localhost:1337/admin](http://localhost:1337/admin)

## 3) Trwale dane (Docker volumes)

Wazne katalogi sa mapowane do volume:

- `postgres_data` -> dane bazy Postgres
- `strapi_uploads` -> pliki uploadowane przez Strapi
- (dev) `frontend_node_modules`, `cms_node_modules` -> zaleznosci kontenerow dev

## 4) Model treści w Strapi

W kodzie jest gotowy `content type`:

- `Page` (`page`):
  - `title`, `slug`, `seoTitle`, `seoDescription`
  - `sections` jako dynamic zone z komponentami:
    - `sections.hero`
    - `sections.content-block`
    - `sections.gallery`
    - `sections.timeline`
    - `sections.faq`

Frontend:

- dla `/` laduje `slug = home`
- dla `/:slug` laduje strone o danym `slug`

## 5) GHCR przez GitHub Actions

Workflow: `.github/workflows/ghcr.yml`

Publikowane obrazy:

- `ghcr.io/<owner>/page`
- `ghcr.io/<owner>/page/strapi`

Trigger:

- push na `main`
- tagi `v*.*.*`
- manualnie (`workflow_dispatch`)

Wymagania:

- repo na GitHub (np. `CrooLyyCheck/page`)
- domyslny `GITHUB_TOKEN` z uprawnieniem `packages:write` (ustawione w workflow)

## 6) Szkielet projektu

```text
.
├─ .github/workflows/ghcr.yml
├─ docker-compose.yml
├─ docker-compose.dev.yml
├─ Dockerfile
├─ Dockerfile.dev
├─ src/                         # React + Vite frontend
└─ cms/                         # Strapi app
   ├─ Dockerfile
   ├─ config/
   ├─ public/uploads/
   └─ src/
      ├─ api/page/content-types/page/schema.json
      └─ components/sections/*.json
```

## 7) Baza projektu

Starter jest przygotowany jako lekka, kontenerowa baza inspirowana:

- [CrooLyyCheck/teb-glass](https://github.com/CrooLyyCheck/teb-glass)

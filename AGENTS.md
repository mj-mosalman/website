# AGENTS.md

Project-specific notes that are not obvious from the manifests.

## What this is

Aurelia Aesthetic Clinic — a React + TypeScript + Vite site with a small Node
consultation-request service. No framework beyond React; routing is a ~100-line
history-API router in `src/router/Router.tsx`.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d
```

- `web` — Vite dev server on host port 3000 (the preview entry point).
- `api` — `node server/index.mjs` on the internal network only, reached through
  the Vite dev proxy at `/api` (single origin, so no CORS and no cookie issues).

`docker compose logs -f web` / `-f api` show live output.

## Non-obvious setup

- **`node_modules` is a named Docker volume**, not a repo directory. The source is
  bind-mounted over `/app`, so installs happen at container start
  (`npm install` then `exec npm run dev`). `package-lock.json` is committed;
  regenerate it in a container:
  `docker run --rm -v "$PWD":/app -w /app node:22-alpine npm install --package-lock-only`
- **The API has zero dependencies** (Node built-in `http`), so the `api` service
  never needs an install and starts instantly.
- **Consultation requests are appended to `/data/consultations.jsonl`** inside the
  `consultations` named volume (mode 0600). This is a development-grade store: it
  is not encrypted, has no retention policy, and is not transmitted anywhere. A
  production inbox needs a real store plus access control.
- **No email is sent.** A successful submission returns a reference and stores the
  request; the success copy says exactly that and never claims a confirmation
  email or a booked appointment.
- Sandbox preview overrides (gated on `BASE44_PREVIEW_MODE === "1"`, unchanged
  otherwise) in `vite.config.ts`:
  - `server.watch.usePolling` — bind-mounted files do not always emit inotify
    events in the sandbox.
  - `server.allowedHosts` gains `.${BASE44_SANDBOX_HOST_DOMAIN}` — the preview
    proxy forwards `<port>-<sandbox id>.<domain>` as Host, and the sandbox id
    rotates.
- The dev server binds `0.0.0.0:3000` with `strictPort`.

## Design tokens

`src/styles/tokens.css` is the single source for the palette (moss / cream /
sage), the radius scale and the type steps. Display type uses `--font-display`
(Fraunces, loaded in `index.html`); running text uses Newsreader, UI text Inter.
The home page is laid out around large radii and photographic panels — keep new
sections on the same scale rather than introducing new greys or sharper corners.

## Verifying

```bash
curl -s http://localhost:3000/ | grep -c '@vite/client'   # live dev server
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/src/main.tsx
curl -s http://localhost:3000/api/health                  # {"status":"ok"}
curl -s -X POST http://localhost:3000/api/consultations \
  -H 'Content-Type: application/json' \
  -d '{"requestId":"verify-0001","fullName":"Test Person","email":"test@example.com","contactMethod":"email","privacyAccepted":true}'
docker compose -f docker-compose.base44.yml exec -T api sh -c 'wc -l < /data/consultations.jsonl'
```

A production bundle served on port 3000 means the edit loop is broken.

## Content and honesty rules

- `src/content/*` is the single source of truth. Treatment copy is deliberately
  free of prices, durations, outcome claims and recovery timelines: none are
  verified. `medicalReviewStatus` is `pending-review` everywhere and
  `medicallyReviewedBy` / `lastReviewedAt` are `null` — do not invent reviewers.
- Practitioner records are `profileStatus: 'placeholder'` with no names.
- Clinic contact details are `null` and `contactVerified: false`; the UI states
  that they are missing rather than showing invented ones.
- Photography lives in `public/media/` and is wired through
  `src/content/media.ts` → `<Photo>` (`src/components/ui/Photo.tsx`), which applies
  one shared grade to every image. The files are openly licensed stock photographs
  (Pexels / Unsplash, logged in `public/media/CREDITS.md`), used as development
  imagery — never photography of this clinic, its team or its patients. Treatment
  and article cards map their `art` tone to a photo via `tonePhotos`; team cards
  use treatment scenes (`practitionerPhotos`) rather than stock faces, so no model
  is presented as a named clinician. Replace the files, keep the names.
- `ArtPanel` still exists as a CSS/SVG surface but is no longer used on the home
  page; the home hero is `src/components/home/*` styled in `src/styles/home.css`.
- `src/content/stories.ts` is empty on purpose; `PatientStories` renders nothing.

## Tests

None yet. `npm run build` runs `tsc --noEmit` plus the production build and is the
current type/lint gate.

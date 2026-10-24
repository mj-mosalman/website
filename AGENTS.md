# AGENTS.md

Project-specific notes that are not obvious from the manifests.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d
```

The app is served on host port 3000 by the Vite dev server (React + TypeScript).
`docker compose logs -f web` shows live compilation.

## Non-obvious setup

- **`node_modules` is a named Docker volume** (`website_node_modules` or similar),
  not a directory in the repo. The source is bind-mounted over `/app`, so anything
  installed at image build time would be hidden; instead the container runs
  `npm install` on every start before `exec npm run dev`. Changing `package.json`
  is therefore picked up by a container restart, no rebuild needed.
- `package-lock.json` is committed. Regenerate it in a container, not on the host:
  `docker run --rm -v "$PWD":/app -w /app node:22-alpine npm install --package-lock-only`
- **Sandbox preview overrides** (`vite.config.ts`, gated on
  `BASE44_PREVIEW_MODE === "1"`, unchanged otherwise):
  - `server.watch.usePolling` — bind-mounted files do not always emit inotify
    events in the sandbox, so hot reload needs polling.
  - `server.allowedHosts` gains `.${BASE44_SANDBOX_HOST_DOMAIN}` — the preview
    proxy forwards `<port>-<sandbox id>.<domain>` as the Host header, and the
    sandbox id rotates, so the wildcard is required. The platform also passes
    `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, which Vite 6.1+ appends itself.
- The dev server binds `0.0.0.0:3000` (`strictPort`) so the proxy can reach it.

## Verifying

```bash
curl -s http://localhost:3000/ | head -20      # should include /@vite/client
curl -s http://localhost:3000/src/main.tsx     # live source, not a bundle
docker compose -f docker-compose.base44.yml ps # web should be "healthy"
```

A production bundle served on port 3000 means the edit loop is broken — the dev
server must serve unhashed source modules.

## Tests

None yet. `npm run build` runs `tsc --noEmit` plus the production build and is the
current type/lint gate.

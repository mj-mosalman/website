# website

A React + TypeScript site built with Vite.

## Development

```bash
docker compose -f docker-compose.base44.yml up -d
```

Open http://localhost:3000. The dev server hot-reloads on save; `node_modules`
is installed into a Docker volume on container start.

Run it without Docker instead:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # type-check + production bundle in dist/
npm run preview   # serve the built bundle
```

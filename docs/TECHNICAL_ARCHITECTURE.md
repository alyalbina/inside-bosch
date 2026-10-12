# Technical architecture

React 19 + TypeScript + Vite, statically hosted; OpenSeadragon 5 lazy-loaded only on entering the viewer. No application server, API key or AI runtime is needed. Art is authentic reproduction; no generated painting content.

| Location | Responsibility |
|---|---|
| `src/App.tsx` | Modes, dialogs, journal and route interactions |
| `src/components/Opening.tsx`, `Header.tsx`, `Inspector.tsx` | Opening, navigation and reading presentation |
| `src/components/Viewer.tsx` | OSD lifecycle, overlays, coordinates, navigation and failure states |
| `src/components/Modal.tsx` | Native dialog lifecycle and focus return |
| `src/audio.ts` | Explicitly started contemporary synthesised ambience |
| `src/model.ts` | Typed bilingual annotation and journal models |
| `src/data/` | Editorial records, sources, journey and comparative threads |
| `src/state.ts` | Safe journal validation and bounded navigation |
| `public/art/` | Authentic exterior, overview, native-resolution DZI pyramid, crops |
| `public/data/annotations.json` | Export of structured editorial records |
| `tests/` | Content, relationships, storage/geometry and complete pyramid checks |

## Why DZI rather than a remote IIIF service

IIIF Image API supports region/size-based image access and OSD understands IIIF sources. No authenticated, rights-cleared and operational IIIF endpoint for this exact reproduction was verified here. Instead, the retrieved Commons original is processed into a local DZI pyramid. The standard uses 512 px WebP tiles, one-pixel overlap, all levels through native resolution. There is no direct full-image decode in visitors’ browsers.

Use same-origin relative URLs to avoid third-party outages and CORS dependencies. Crops are separate <=800 px JPEGs. Tile concurrency is 6, cached tile count 160; OSD requests needed tiles on demand. These are configuration choices, not benchmark results. Retina and low-memory performance remain unmeasured.

## Data and privacy

The journal is JSON in `inside-bosch:journal:v1`, language in `inside-bosch:lang`. No network journal write, accounts or analytics. Validate types, IDs, unique entries, note lengths and route bounds during restore. Never trust local storage to contain a complete valid object. Browser storage can be cleared; export provides a portable copy. There is no import UI in this release.

## Deployment

`npm ci`, `npm test`, `npm run build`. Static output is `dist/`; relative Vite base supports a GitHub Pages subpath. Sites identity/configuration lives in `.openai/hosting.json`; deployment must reference the exact pushed source commit. For another host deploy the built `dist`, never source files or node_modules.

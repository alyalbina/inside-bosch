# Test plan and verification log · 12 October 2026

## Automated coverage

- 25 bilingual entries; all normalised boxes stay within image; all anchors match box centres.
- Sources use HTTPS; every claim and relationship resolves to a real registered ID.
- 15-stop journey has Eden → Garden → Hell order, includes the five original subjects, and stops at bounds.
- Five motif routes each reference multiple real details.
- Journal recovers from malformed/old data, unknown IDs, duplicates and invalid route position; note text is bounded.
- Native DZI is exactly 39,137 × 22,279, 512 px WebP; every expected tile exists at every level.
- Every detail crop plus opening and exterior images are present.
- Russian and English opening render without network, storage or viewer.
- TypeScript check and production Vite compilation.

Final verification: 10 automated checks passed. The complete pyramid contains 4,559 WebP tiles across 17 levels; representative tiles at every level decoded successfully.

## Portfolio export verification

The repository cover, social preview, chapter plate and visual-system plate were rendered and visually inspected. The Russian and English static case pages have one primary heading each; their local asset references and section anchors resolve. README and case-study relative links resolve. The completed export passes the same 10 automated checks and production build. This is structural verification of the portfolio pages; no browser-rendering or interaction result is claimed.

## Visual asset verification completed

The exact overall reproduction and a contact sheet of all initial boxes were inspected. The pig scene and predator crop were separately revised after inspection. These checks inspect source imagery, not a rendered browser interface. Original SHA-1 matches the Commons metadata: `61b8082a24c953ce819c3238eb2d19445979945e`.

## Version 0.3 visual revision

The previous hosted opening screenshot was inspected to guide revision. The catalogue-style opening uses a new authentic crop and bundled Latin/Cyrillic fonts. New display components replace the embedded opening/header/inspector JSX. The selected marker remains visible while overview markers start hidden. Build and automated tests are rerun after these changes.

## Browser verification not completed

The supported Sites browser-control skill is unavailable in this session. Per the Sites workflow, no preview server or substitute browser-control path was started. Therefore this log does **not** claim passing UI, browser, mobile or performance tests.

Pending scenarios: enter through prologue; resume route; pan/wheel/pinch; click each marker; refocus after home; hide markers; each panel filter; change language with a detail open; search for Cyrillic/English; follow all threads; save/unsave and edit note; reload/export; dialog focus/Escape; keyboard journey; image/storage failures; no spontaneous audio; background audio pause; fullscreen; reduced motion; 390/768/1440 px layouts. User testing: 8–12 visitors, task success and confusion observed without leading questions. No results fabricated.

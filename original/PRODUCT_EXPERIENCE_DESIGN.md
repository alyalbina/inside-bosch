# INSIDE BOSCH — Product & Experience Design Document
Version 0.1 · 12 October 2026 · Educational interactive exploration prototype

## Vision
Turn a single painting into a compelling, evidence-based exploration experience. The visitor should feel like a curious investigator, not a passive museum audioguide listener. Core promise: **Look closer. Follow a motif. Change your interpretation.**

## User groups and jobs to be done
1. Curious visitor: quickly understand why individual scenes look strange.
2. Art enthusiast: navigate iconography, compare interpretations, consult original scholarship.
3. Educator / student: explore evidence vs conjecture with traceable citations.

Research status: these are product assumptions, not validated personas or interviewed groups.

## Experience pillars
- **Wonder before explanation:** draw attention to the observed anomaly, then offer sourced context.
- **The work, not a recreation:** examine a faithful reproduction, never substitute fabricated Bosch details.
- **Uncertainty is visible:** separate what is depicted, the source-based reading, and disputed proposals.
- **Freedom within a journey:** users can explore freely or follow a curated sequence.
- **No trivia gates:** progress follows looking and thinking, not guessing hidden “correct” meanings.

## Core loop
Observe painting → notice anomaly → zoom → inspect → read evidence → follow another visual link → update personal understanding.

## Information architecture
Landing / intro → Journey / Free exploration → Canvas + detail inspector → Symbol Threads → Journal → Sources / Credits / Rights.

## MVP scope
- Responsive browser interface; no sign-in required.
- Open triptych reproduction, zoom and pan.
- Five initial hotspot discoveries: Adam and Eve, Eden fountain, circle around central pool, fragile glass sphere, Tree-Man.
- Curated guided sequence and manual hotspot selection.
- Source links and uncertainty-aware text.
- Intro treatment suggesting opening doors (not an authentic reproduction of outer doors).
- Discovery progress, current-session only.

**Out of scope for this first prototype:** the actual outer panel image, 25 verified hotspots, tiled 40k image zoom, audio tour, user accounts, saved notes, search/filter, languages beyond Russian, a separate source bibliography panel, and production-quality accessibility compliance.

## Intended V1 expansion
- 25–40 editorially verified hotspots, including exterior grisaille.
- True multi-resolution Deep Zoom via OpenSeadragon and an explicitly authorized image source / hosted tiles.
- Authoring tooling for bounding boxes mapped onto image pixel coordinates.
- Symbol Threads explorer linking recurrent motifs with evidence references.
- Guided chapters: Creation → Eden → Delights → Hell → Epilogue.
- RU/EN translations and optional audio descriptions with transcripts.
- Local journal persistence with user consent; unobtrusive privacy practices.
- Accessible keyboard navigation, reduced motion, focus management, image alternatives and text-only route.

## Content model
`detail` schema fields: `id`, `panel`, `title_ru`, `title_en`, `anchor_x_pct`, `anchor_y_pct`, `bounding_box_px`, `visual_description`, `interpretations[]`, `certainty_level`, `sources[]`, `cross_links[]`, `editor_review_status`, `asset_revision`.

`interpretation` fields: `text`, `kind` (`visible_fact`, `museum_interpretation`, `scholarly_argument`, `speculative`), `source_id`, `confidence_language`.

Do not use invented quotations or anonymous internet claims as scholarly sources.

## Journey outline
Prologue: What is a triptych? A curious cover (original outer leaves to be sourced). Chapter 1: What is happening in Eden? Chapter 2: Why does the center look pleasurable and fragile? Chapter 3: How does enjoyment become punishment? Epilogue: Which reading is persuasive, and which details resist explanation?

## Interaction and motion
- Pan: drag/pointer; zoom: wheel/buttons; center focus: click marker or journey item.
- Avoid excessive dramatic transitions; use gentle easing in a production viewer.
- Markers visible at overview, reprojected correctly during zoom.
- Inspector maintains the distinction between observation and interpretation.
- Non-animated fallback to support reduced motion.
- No gamified reward for “correct answers” to contested symbols.

## Visual direction
Palette: deep blue-black #0c1417, muted teal #223339, archival warm cream #f2eee3, brass-gold #dfb87a. Editorial serif headings, legible sans-serif UI; art occupies the visual center. No fictional effects painted onto the Bosch image.

## Editorial sources and attribution
- Museo Nacional del Prado catalog (primary museum interpretation): https://www.museodelprado.es/en/the-collection/art-work/the-garden-of-earthly-delights-triptych/02388242-6d6a-4e9e-a992-e1311eab3609
- Museo Nacional del Prado easy-to-read artwork: https://www.museodelprado.es/en/whats-on/multimedia/the-garden-of-earthly-delights-bosch/c32e04cc-745c-8d42-a6d9-bf24bb93cb06
- Smarthistory analysis: https://smarthistory.org/garden-bosch/
- Wikimedia Commons image file and Public Domain Mark: https://commons.wikimedia.org/wiki/File:The_Garden_of_earthly_delights.jpg

Date the work according to the Museo del Prado as c. 1490–1500; note uncertainty rather than forcing precision. The image shown is Wikimedia-hosted and might not load without internet or when Wikimedia is rate-limiting. The artwork is public domain, but commercial reuse of a specific reproduction and third-party services should be legally reviewed in intended markets. Not affiliated with the Prado.

## Technical architecture
MVP is a standalone `index.html` with accessible semantic sections and vanilla JS; no install needed, network required for image load. Art and hotspots share a single CSS transform. Production: Vite + TypeScript, content in curated JSON, OpenSeadragon deep zoom, local first search index, optional CMS editing, image processing pipeline generating tiles if license permits.

## Quality / risk gates
- Validate hotspot positions against the exact released source image and viewport; current positions are provisional.
- Check all interpretations with editor and at least one reliable citation per passage.
- Verify keyboard control, focus movement, mobile gesture behavior.
- Verify performance on low-memory phones; no direct rendering of full 39k-pixel original.
- Validate legal provenance and image-hosting reliability prior to commercial/public marketing.
- Security: no secret in frontend; no analytics or visitor tracking before an explicit privacy decision.

## Backlog and acceptance criteria
P0 (prototype): intro; 5 cards; navigation; pan/zoom; source links; responsive layout. Acceptance: can launch by double-clicking HTML and navigate five annotations if remote art loads.
P1 (editorial): 25 verified scenes, panels, reliable coordinates, uncertainty labeling; acceptance: zero unsourced interpretive assertions in release content.
P1 (technical): tiled artwork and hotspots anchored on exact pixels; acceptance: responsive zoom on 1080p/retina and smartphone without freezing.
P1 (UX): focus and keyboard, text alternative and reduced motion; acceptance: complete guided journey without mouse.
P2 (experience): full painted exterior, symbol connections, ambient sound and RU/EN; acceptance: all audio independently muted and transcribed.
P2 (production): deploy GitHub Pages, monitor load errors, legal review and user testing. Acceptance: 8–12 observed usability tests, no blocking confusion on essential workflow.

## Initial validation plan
Find 8–12 first-time viewers; avoid leading explanations. Tasks: discover a detail in each panel, find its source, explain the difference between fact and interpretation, find the full view again. Track task success, time, confusion and voluntary exploration. Metrics are targets to measure, not achievements.

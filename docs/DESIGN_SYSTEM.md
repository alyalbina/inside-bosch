# Design system · version 0.3

The visual system follows an art catalogue: an open, warm paper spread for the first encounter; a dark viewing room for the artwork; paper-coloured interpretation pages. Authentic artwork remains unchanged. Typography, negative space and image proportions do the visual work.

## Foundations

| Token | Value | Purpose |
|---|---|---|
| Paper | `#ede9df` | Opening, reading panel, dialogs |
| Soft paper | `#f4f1e9` | Note writing area |
| Ink | `#292b25` | Text, primary actions |
| Rust | `#996149` | Editorial accents and links |
| Viewing room | `#181a16` | Viewer and exploration chrome |
| Hairline | `#d2cfc3` | Low-emphasis separators |
| Display | Cormorant Garamond 400, normal/italic | Titles and questions |
| Interface | Manrope 400–600 | Navigation and long-form labels |

Latin and Cyrillic font files are bundled locally under OFL 1.1; no third-party font request is needed. Responsive display sizes differ between Russian and English because text widths differ.

## Components and rules

- Opening spread: one dominant title, one authentic portrait crop, one main action and one secondary text action. The annotated glass globe links directly into free exploration.
- Header: small wordmark and plain navigation; icon alternatives on narrow screens.
- Viewer: quiet control group, small navigator; markers off initially. The selected scene remains indicated. Marker hit area is larger than its visible dot.
- Inspector: no duplicate image; title, hook, observation, optional interpretation drawer, open question, two related scenes and source drawer.
- Catalogue: image-and-text rows with whitespace, no filled dashboard cards.
- Threads: comparative image strips with an attributed distinction between visible similarity and symbolic meaning.
- Journal: simple writing space, saved-state labels and export, no points or achievement badges.
- Dialog: paper spread with native keyboard focus containment and Escape dismissal.
- Motion: brief entrance fade and OSD camera transitions. Reduced motion disables CSS transitions and uses immediate camera fitting.

## Changes from 0.2

Removed the full-screen dimmed-background opening treatment, repeated crop in the reading panel, numbered bubbles on all scenes at entry, boxed catalogue tiles, coloured evidence chips and redundant historical-context drawers. Context remains in the data export; the one scene with a specific contextual passage keeps its drawer. Audio stops when returning home and remains off on first load.

## Portfolio presentation

The repository cover, social preview, chapter plate and visual-system plate follow the same editorial foundations. They use credited artwork crops and local fonts; they are presentation assets, not interface screenshots. Optional authoring scripts regenerate the plates and the two static portfolio pages. The built portfolio lives at `portfolio/index.html` and `portfolio/index.en.html` and links to the application.

## Validation limit

A screenshot of the previous hosted opening was inspected. The new design is implemented and build checked. Browser interactions, mobile gesture handling and accessibility conformance are not asserted as tested. A provider-produced screenshot of the new opening can be inspected after deployment; that does not replace interaction testing.

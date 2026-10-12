# MVP audit → version 0.2

The supplied `index.html`, README and product document were read. Original files are retained in `original/`. The first release used one externally loaded 3840 px image and CSS transforms. No dependencies, persistent storage, source-linked claim records, English interface, pinch implementation, tile pyramid or image-position navigator were present. Browser testing was explicitly incomplete in the original documentation; this review does not retroactively claim it passed.

## Preserved intent and working code paths

Five topics, guided sequence, free selection, source links, drag/zoom, whole-image reset and image-load error feedback remain. The implementation was migrated to React + TypeScript because the requested viewer, bilingual records and persistent journal exceed the original monolithic prototype’s structure.

## Concrete fixes

| Original | Updated |
|---|---|
| Adam and Eve at 16%, 82% | Bounds visually checked around the full group; centre near 13.45%, 72.35% |
| Fountain at 20%, 42% | Bounds around the pink structure; centre near 12.35%, 37.85% |
| Circle at 52%, 50% | Includes pool and full circuit, rather than focusing below the pool |
| Glass globe at 42%, 78% | Corrected to the left foreground of the central panel, centre near 30.75%, 70.8% |
| Tree-Man at 86%, 61% | Corrected upward to the actual body and face, centre near 86.7%, 43.3% |
| Unverified claims about fountain damage and changed Eve underdrawing | Removed from initial-scene text; direct sourced readings used only where supported |
| Five-fold enlargement of preview | Native 39,137 × 22,279 DZI tile pyramid, local hosted assets |
| Session-only discoveries, route restart destroys seen state | Journal persists and restarting the route preserves discoveries |
| Abstract fake exterior doors | Actual exterior reproduction in the prologue |

Bounds are normalised to the exact photographed image, including frame/gutter space. They must be reviewed again if a different reproduction replaces it. Human perception, curator review and mobile performance remain validation gates.

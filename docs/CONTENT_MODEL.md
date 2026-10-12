# Content model

Canonical editorial records are typed and separated from the UI in `src/data/details.ts`, `threads.ts`, `sources.ts`. `npm run export:content` produces a complete JSON snapshot at `public/data/annotations.json`. Do not edit only the exported copy; update canonical data, re-export and run tests.

| Field | Contract |
|---|---|
| `id` | Stable lowercase scene identifier |
| `panel` | eden / garden / hell |
| `title`, `hook`, `observation`, `context`, `question` | Both `ru` and `en` required |
| `box` | x/y/width/height in 0–1 fractions of the exact source image |
| `anchor` | Centre of region; projected through OSD’s native image transform |
| `shape` | rect in this version; polygon authoring is not implemented |
| `interpretations[]` | Text, kind and source IDs; empty for observation-only records |
| `sourceIds` | Includes visual reproduction plus all interpretative references |
| `motifs` | Editorial tags; not assertions of a symbolic meaning |
| `related` | Stable IDs of other details |
| `coordinateReview` | visually_checked; not curator certification |
| `editorReview` | source_checked / observation_only |
| `assetRevision` | Exact master reproduction revision |

Certainty is represented through claim kind, attribution, uncertainty wording and review status rather than a misleading numeric probability. Hypotheses not supported by retrieved sources were excluded; the current schema has no speculative claim records. Historical context can explicitly state that no supported contextual meaning is asserted for the particular observation. A future schema should split structured historical claims separately when the corpus becomes larger.

`docs/ANNOTATION_SCHEMA.json` is the JSON Schema for one detail. Cross-ID resolution and `x+width <= 1`, `y+height <= 1` require application validation and are covered by tests. Threads contain a title, description, `visual_comparison` kind and an ordered sequence of detail IDs. The export also contains ordered journey IDs and the source catalogue.

Journal: `version`, unique `seen`/`saved`, note map, bounded `journeyIndex`, started `threads`. Migration currently resets unsupported versions and recovers invalid fields. An account, sync server, note import or authoring UI is not implemented.

# Interaction specifications

- Drag: pan inside constrained artwork. Mouse wheel: zoom around pointer. Double-click: zoom. Pinch: OSD native gesture handling.
- Viewer keyboard: +/= and − zoom, arrows pan, 0 returns to overall view. Buttons and catalogue provide alternatives to direct canvas interactions.
- A detail’s normalised box converts to native pixels through the tiled image’s coordinate transform. Camera fits it with small padding. Selecting an already selected detail refocuses it using a focus revision counter.
- Markers: fixed screen-sized buttons with localised labels. Marker visibility can be toggled; panel filters restrict markers. Each selection opens its inspector.
- Reset camera does not erase the selected explanation. Mode changes and new route positions preserve discoveries and notes.
- Journey: bounded previous/next; final next opens epilogue rather than wrapping. Resume clamps stored route position to a valid stop. Starting over keeps journal entries.
- Thread: bounded detail traversal and comparison list; choosing an unrelated detail leaves the thread.
- Dialogs: native modal dialog, Escape dismissal, automatic focus containment and return to trigger. Inspector title receives focus after a selection; sources remain normal links.
- Reduced motion: CSS animation removed and viewer animation/blend durations set to zero.
- Audio: explicit toggle, volume slider, suspended in hidden tab. Contemporary generated tones, no historical or documentary claim.
- Errors: DZI failure exposes retry; partial tile failure exposes retry; blocked storage falls back to session state with export.

The above are implemented behaviours, not a claim that browser or assistive-technology testing passed.

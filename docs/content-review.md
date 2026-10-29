# Version 2 content and quality review

Reviewed 29 October 2026 after the Version 2 upgrade.

## Audience review

**Primary student:** The quick path offers a short introduction, three school situations one at a time, supportive feedback, and six familiar values. An optional action is limited to 140 characters. No trauma prompt, graphic account or moral score is included. Mobile body copy was enlarged during review.

**Secondary student:** The deeper path separates a thematic reading trail from a literal chronology. Five themes distinguish interpretation from memoir summary. Discussion considers silence as choice, survival and constrained power; these possibilities can coexist. Education is not presented as a guaranteed rescue from circumstances.

**Teacher:** Printed page references are visually checked and documented in `book-evidence.md`. The doctor is correctly identified as the author’s cousin. Unreadable Part 1 references are omitted. The mother's care and strength are recognized without turning her silence into a character flaw. The selected passages are not presented as a complete memoir summary or a representation of all Afghan women.

## Version 2 design and interaction review

- Original split SVG portrait remains the visual anchor and is explicitly identified as symbolic, not a portrait of Sharifa.
- A restrained charcoal, deep-red and warm-neutral system creates a more serious exhibition identity.
- The cinematic intro plays once per browser session, can be skipped immediately, can be replayed, and collapses quickly under reduced motion.
- The scenario stage now explains the task, records the selection, presents tradeoffs and a book-theme connection, and maintains one obvious next action.
- Five typed reflection styles combine weighted scenario choices with selected values. Results are descriptive, not diagnostic or moral scores.
- The Afghanistan context section is visually and editorially separate from the memoir and cites UNESCO, UNICEF and IIFA directly.
- Submitted photographs remain unpublished because rights, dates and identities were not sufficiently documented.
- Review of the exported PNG revealed the initial title was too wide. Explicit font loading, a smaller title and bounded text width corrected it.
- Stress-tested export with the longest value labels and a 140-character unbroken word. Wrapping stays inside the card and above its footer.
- Small terracotta text was darkened to #8b4838 to meet normal-text contrast; the approved #A85C49 remains the large display/accent color. Ink/cream and sage/green body combinations have strong contrast. Muted text #57615a on cream is approximately 5.72:1.
- Replaced platform-dependent value glyphs with consistent line SVG icons.

## Verification

- `npm.cmd run typecheck`: passed.
- `npm.cmd run build`: passed; production assets use `/poster/`.
- Eleven Playwright tests against the production preview: passed.
- Scenario selection, disabled Next before an answer, Back, retained answers across path changes, completion and Restart: passed.
- Up-to-three value selection, natural deterministic text, optional action, preview, PNG, clipboard, Edit, Reset and clear-saved control: passed.
- Reflection restored after reload; corrupted JSON recovered safely; unavailable localStorage keeps the interface usable: passed.
- Export is a real 1080 × 1350 PNG without interface controls; regular and maximum-length samples visually reviewed.
- Keyboard skip link, scenario heading focus, native accordion keyboard activation, and edit focus: tested.
- Reduced-motion CSS: tested.
- Responsive widths 375, 390, 768, 1024 and 1440: no horizontal document overflow in the deeper path; screenshots captured.
- No browser page errors or failed HTTP resource responses during the deeper-path test.
- Build contains HTML, CSS, JavaScript, local fonts and favicon only. No source PDFs or scan images are included.

Production JavaScript is approximately 255 kB / 80 kB gzip; CSS approximately 20 kB / 5 kB gzip. Fonts use `font-display: swap` and are served locally. No API key or external runtime service is required.

## Limits

Tests use Chromium on Windows, not physical iPhones, Android phones or Safari. There was no formal screen-reader audit or external accessibility certification. Part 1 could not be verified and needs a readable replacement before its specific proposed citations can be used. GitHub Pages configuration is prepared but the implementation is not published. The physical QR destination can only be checked against the new site after an authorized deployment.

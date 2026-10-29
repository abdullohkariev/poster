# Asset audit

Reviewed 29 October 2026. Files were inspected from the surrounding project folder. None were copied into the repository or production build because source and licence information was not supplied.

| Filename | Dimensions / type | Visible subject | Identity / relevance | Source and licence | Proposed placement | Publish? |
|---|---|---|---|---|---|---|
| `webp.webp` | 630 × 420 WEBP | A line of women wearing blue and grey full-body coverings | Unidentified people; could illustrate one contemporary circumstance but risks reducing Afghan women to a single image | Unknown | None | **No.** Rights and identities are unverified; emotionally reductive without context. |
| `images (1).jpg` | 739 × 415 JPEG | A girl looking between women wearing blue coverings | Unidentified people; contextual news-style image | Unknown | None | **No.** Rights, date, location and identities are unverified. |
| `afghanistan-featured-image-2-41144.png` | 960 × 615 PNG | Young women walking together in an outdoor public or educational setting | Unidentified people; potentially useful for education/history context | Unknown | None | **No.** Visually relevant, but no source, date or licence is attached. |
| `Flag-Afghanistan.webp` | 800 × 533 WEBP | Black-red-green tricolour with white emblem | A national flag graphic; exact source and historical version not documented | Unknown | None | **No.** Unnecessary to the memoir and context section; provenance is unverified. |
| `Sharbat_Gula.jpg` | 254 × 400 JPEG | The well-known portrait of Sharbat Gula photographed by Steve McCurry | Sharbat Gula, **not Sharifa Sharif** | Copyrighted photograph; no publication licence supplied | None. An authorized-source link could be added in future if educationally necessary. | **No.** Do not republish or label as Sharifa. |
| `photo_2026-10-29_09-05-34.jpg` | 600 × 600 JPEG | QR code | The code resolves to the project’s intended web destination; not story imagery | User-supplied project asset; authorship not documented | Physical poster only | **Not needed** in the website. |
| `public/favicon.svg` | 64 × 64 SVG | Original geometric arch/dividing-line mark | Project-created symbolic identity | Created for this project | Browser favicon | **Yes.** Already in production. |
| `src/components/Art.tsx` | Responsive SVG source | Original divided symbolic portrait and line symbols | Symbolic; explicitly not a portrait of Sharifa | Created for this project | Intro, hero, chapters and scenarios | **Yes.** No real-person identity claim. |

## Decision

Version 2 continues with original symbolic SVG art. This avoids misidentification, undocumented copyright, and the repeated use of anonymous women as emotional decoration. The contextual section uses sourced text and direct links to authoritative organizations rather than unsourced photographs.

The four scanned memoir PDFs remain private research sources. They are excluded by `.gitignore`, absent from `public/`, and must never be deployed.

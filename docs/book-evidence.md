# Book evidence record

Source: Sharifa Sharif, *On the Edge of Being: An Afghan Woman’s Journey*, supplied scanned edition. Review date: 29 October 2026. Printed page numbers below are read from the page headers, not inferred from PDF indices. PDF indices are one-based.

## Method and scope

The workspace supplied `Part 1.pdf`, `Part 2.pdf`, `Part 3.pdf`, `Part 4.pdf` (without the requested `(2)` suffix). Each opens as 18 PDF pages. Text extraction returned no text. Pages were rendered locally with PyMuPDF, and relevant complete spreads visually read. No OCR transcription is used as authority. Temporary review images remain in ignored `tmp/pdfs`; none are in `public` or `dist`.

Part 1 reports a repaired PDF structure and zlib compressed-data errors; its rendered pages are blank. Embedded-image extraction also failed to decode. No claim is marked verified from Part 1. The originals were not intentionally edited, replaced or deleted by this implementation. The observed file size of Part 1 changed during the session from 28,700,573 to 52,437,941 bytes without a tool command writing to it; the cause is unknown. Retain the original source separately and obtain a readable copy before citing its passages.

Part 2 contains printed pp. 42–77, Part 3 pp. 78–113, and Part 4 pp. 114–148 (final page is a single page). Overview samples were inspected across all readable parts. Part 3's opening spread, pp. 78–79, was read for context, but its difficult events were not selected for this general school experience. The selected public evidence comes from Parts 2 and 4. No claim is made that these moments summarize the entire book.

## Verified passages used

| Topic | Printed pages | Source PDF / PDF page | Factual original summary | Website use | Status |
|---|---|---|---|---|---|
| Featured excerpt | 67 | Part 2.pdf / 13, right-hand page | The opening of “Womanhood and Guilt” connects being female with learned guilt. | Hero | Words visually verified. The site quotes only the nine-word opening clause, “Being female was like being wrapped in guilt.” The source continues with a comma; the site closes the excerpt with a period and labels it an excerpt. |
| Childhood expectations and guilt | 67–68 | Part 2.pdf / 13–14 | Sharifa recalls feeling blamed and having less freedom than boys, and questions why girls should serve brothers without reciprocity. | Growing up; Guilt; discussion | Summary and printed headers verified. The general lesson about undeserved blame is explicitly interpretive. |
| Womanhood and expectations | 67–72 | Part 2.pdf / 13–16 | Sharifa describes unequal expectations for girls and boys and the pressure to conceal aspects of girls’ lives. | Honour; power interpretation | Full relevant spreads visually checked. Sensitive details deliberately excluded. “Honour” is a thematic reading, not a claim that this is the chapter title. |
| Education and limited opportunity | 74–76 | Part 2.pdf / 17–18 | Sharifa teaches grade-six literature in Kunar. Hawa values school and imagines becoming a teacher; pressures outside school limit her choices. | Education chapter; evidence | Verified. Public summary acknowledges barriers and does not invent a happy resolution. Difficult events are not reproduced. |
| Work, care and courage | 132–135 | Part 4.pdf / 10–11 | Sharifa reflects on women’s work and recounts her cousin’s medical work under restrictive conditions. | Helping others; survival discussion | Verified correction to brief: the doctor is Sharifa’s cousin, identified on p. 133 and again on p. 135. The first-person account on pp. 134–135 belongs to the cousin. Never described as Sharifa’s own medical career. |
| Language, voice and identity | 138–139 | Part 4.pdf / 13 | Cultural-interpreter training in Canada gives Sharifa language to understand experiences. She connects language with recognition and her changing sense of self. | Finding her voice; Voice; silence as choice | Verified. Public content avoids graphic details and does not generalize her linguistic reflections into claims about contemporary languages. P. 139 explicitly describes sometimes answering questions about the past and sometimes not. |
| Mother, communication and reassessment | 144–146 | Part 4.pdf / 16–17 | Sharifa describes her mother’s difficulty communicating in a new country and her efforts to connect through care. She later recognizes strength in qualities she had judged negatively. | Understanding silence; Identity; discussion | Verified. Uses p. 144 in addition to the initial requested 145–146 because it directly supports the communication-barrier summary. Her mother is not presented as weak. |

## Unverified proposed references: excluded

- **18–19 / Part 1:** cannot verify childhood incident or printed reference. No specific incident or citation from these pages is published. Verified pp. 67–68 support the gentler discussion of childhood expectations.
- **38–39 / Part 1:** cannot verify the proposed mother/silence passage. No summary or citation from these pages is published. Verified pp. 144–146 support the discussion of communication, care and reassessment.

## Separation of evidence and interpretation

`src/data/book.ts` keeps memoir summaries in `references` and interpretive questions in separate records. Evidence panels say “In the memoir”; theme expansions say “Our interpretation.” The school scenarios are explicitly fictional and not attributed to the book. Survival, choice and unequal power are overlapping readings to evaluate, not diagnostic labels or scored answers. Silence does not imply consent or an obligation to speak.

Only one brief quotation appears. All other public prose is original summary or interpretation. Full source PDFs, scans, long quotations and graphic events are excluded from deployment and ignored by Git.

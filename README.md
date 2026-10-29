# WHO ARE YOU?

A static React + TypeScript literary exhibition inspired by Sharifa Sharif’s memoir. Designed for school visitors arriving from the poster QR code. No backend, analytics, public submissions or runtime API calls.

## Run locally

Use Node.js 24 and npm. On this Windows machine, PowerShell blocks `npm.ps1`, so use **`npm.cmd`**:

```powershell
npm.cmd ci
npm.cmd run dev
```

Open **http://127.0.0.1:5173/poster/**. On macOS/Linux, use `npm` instead of `npm.cmd`.

```powershell
npm.cmd run typecheck
npm.cmd run build
npm.cmd run preview
```

The production preview is **http://127.0.0.1:4173/poster/**. Only `dist/` is deployed. Vite uses `base: '/poster/'`; fonts, icons and bundles are local and base-path compatible.

## Browser tests

```powershell
npx.cmd playwright install chromium
npm.cmd test
```

The test configuration uses the existing Chromium installation on the original workstation if present, otherwise Playwright’s installed browser. You can override with `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. Tests start the production preview automatically; run the build first. Screenshots and the exported card go to ignored `output/playwright/`.

Tests cover scenario navigation and restart; path switching without losing answers; value limits; deterministic text; malformed and unavailable storage; reload recovery and clearing; real 1080 × 1350 PNG export; clipboard; keyboard operation; verified-reference safeguards; and layout widths 375, 390, 768, 1024 and 1440.

## Content and privacy

- [Book evidence](docs/book-evidence.md) records verified printed pages, source file locations, corrections and unreadable material.
- [Content and quality review](docs/content-review.md) explains age-appropriate treatment and validation.
- `src/data/book.ts`, `scenarios.ts`, and `reflection.ts` separate content and typed models from presentation.
- Reflection state stays under `who-are-you:reflection:v1` in localStorage. It is never sent anywhere. If storage is blocked, the current session still works. Clearing removes the saved entry. Scenario answers remain in memory while switching paths; they are not saved across reloads.
- PDF scans, the original photo, analysis packages and generated review images are ignored. Never put them in `public/`.

## Existing repository and safe migration

Inspected on 29 October 2026: this workspace is **not a Git repository**. `https://github.com/abdullohkariev/poster` has default branch `main` and contains `.nojekyll` and a coming-soon `index.html`. No source PDFs were present in its root listing. No commits, pushes, branch deletions or deployment changes were made during implementation.

Preserve repository history by cloning the existing repository into a separate folder. Do not initialize this PDF-containing workspace and force-push it.

```powershell
git clone https://github.com/abdullohkariev/poster.git poster-publish
cd poster-publish
git status --short
git remote -v
git switch -c exhibition
```

Copy **only** these implementation files from this workspace into that clone, replacing the coming-soon `index.html` as the intended migration:

`src/`, `public/`, `docs/`, `tests/`, `.github/`, `.gitignore`, `index.html`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `playwright.config.ts`, `README.md`, `PRODUCT.md`, `DESIGN.md`.

Keep the clone’s `.git/` and `.nojekyll`. Do not copy PDFs, photos, `.tools`, `tmp`, `output`, `dist` or `node_modules`. Review any upstream changes before replacing files.

```powershell
npm.cmd ci
npm.cmd run build
git add src public docs tests .github .gitignore index.html package.json package-lock.json tsconfig.json vite.config.ts playwright.config.ts README.md PRODUCT.md DESIGN.md
git diff --cached --stat
git diff --cached --name-only
git ls-files '*.pdf' '*.PDF'
git commit -m "Build interactive literary exhibition"
```

The PDF check should print nothing. If PDFs are tracked, stop and resolve the publication scope; do not rewrite repository history. When you explicitly choose to publish:

```powershell
git push -u origin exhibition
```

Open a pull request to `main`, review it, and merge when ready. Never force-push. The workflow is configured for the verified default branch `main`; update the branch filter if the repository default changes.

## GitHub Pages and the existing QR destination

1. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
2. Merge the reviewed changes into `main`. The workflow installs from the lockfile, type-checks/builds, and uploads only `dist/`.
3. Alternatively, use **Actions → Publish exhibition to GitHub Pages → Run workflow**, selecting `main`.
4. Wait for the deployment job to succeed. Open **https://abdullohkariev.github.io/poster/**, refresh, and test both paths and card export.
5. Scan the **existing physical QR code** with a phone and verify that it opens that exact URL, with the trailing `/poster/` path. Confirm fonts and art load and no PDF is requested.

This follows the [official Vite GitHub Pages deployment guide](https://vite.dev/guide/static-deploy.html#github-pages). The Actions versions are pinned to the maintained release commits in that guide at implementation time. The public destination is unchanged. **This implementation has not been pushed or deployed.**

## Main files

- `src/App.tsx`: page, navigation and experience switching.
- `src/components/Art.tsx`: original symbolic vector portrait and five compact symbols.
- `src/components/BookSections.tsx`: reading trail, themes and evidence explorer.
- `src/components/StoryChoices.tsx`: three-situation journey.
- `src/components/ReflectionBuilder.tsx`: values, private persistence, preview and controls.
- `src/utils/cardExport.ts`: canvas-based standalone PNG export.
- `src/styles.css`: responsive editorial design and accessibility states.
- `.github/workflows/deploy.yml`: GitHub Pages build and publication.

## Known limits

Part 1 cannot be read reliably; its proposed page references are omitted and replaced with verified passages. Browser testing uses Chromium with emulated viewport sizes, not physical iOS/Android devices. The localStorage fallback and clipboard-denial message are intentional browser limitations. No claim of a formal accessibility certification is made.

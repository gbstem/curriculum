@AGENTS.md

# Codebase Conventions for AI Assistants

This supplements [README.md](README.md) (architecture, setup, emulator/`db:pull`/`db:seed` workflow) with code-level conventions the README doesn't cover. Read the README first. This repo is **independent** — its own Firebase project, not shared with the `admin` or `portal` repos.

## One file is shared with admin and portal: `app/data/courses.json`

The single exception to the independence above. It is a **verbatim copy** of the admin repo's `src/lib/data/courses.json` — the catalog of which courses gbSTEM actually offers each semester — shared the same way `semesterDates.json` is shared between admin, portal and website. **Edit it in admin and copy it here**, per admin's README section "Adding a New Semester"; never hand-edit this copy, because the next rollover overwrites it.

Portal builds every `curriculum.gbstem.org` link an instructor clicks by deriving `/{track}/{id}` straight from that catalog, so an id it contains that this repo has no page for is a dead link in a live dashboard. `__tests__/courses.test.ts` is what keeps the two in step: it fails if the catalog and [`app/data/tracks.ts`](app/data/tracks.ts) disagree about which courses exist, which track one belongs to, or what its URL is. **Adding a course to `tracks.ts` alone will fail that test** — add it to the catalog in admin first.

Note the asymmetry that makes those ids load-bearing: `app/[track]/[course]/page.tsx` lowercases the track segment before lookup but **not** the course segment, so `/cs/webdevA` resolves and `/cs/webdeva` throws "Class not found". Course ids are case-sensitive URL segments, not just keys.

## Middleware lives in `proxy.ts`, not `middleware.ts`

Next.js's conventional `middleware.ts` doesn't exist here — the entry point is `proxy.ts` (exported as `proxy`, matched via its own `matcher` config) which matches the conventions for new Next.js versions. If asked to change auth/session gating, edit `proxy.ts`, not a file you'd create named `middleware.ts`.

## Auth is a 2-role, session-cookie gate — not a security boundary by itself

`lib/session.ts` defines `SessionData { username, role: 'viewer' | 'editor', isLoggedIn }` in an iron-session cookie (`gbstem_session`, 7-day TTL). There are only two accounts, `viewer` and `editor`, checked against `NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD` / `NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD` in `app/api/auth/route.ts`. `proxy.ts` redirects unauthenticated requests to `/login` and calls `session.save()` on every authenticated request, which is what makes it "sliding" — an active user's session never expires. **The client-side `useSession` hook (`lib/useSession.tsx`) is UI-only.** Every Server Action in `app/actions.ts` independently re-checks `session.role` (`checkEditorAuth`/`checkViewerAuth`) before touching Firestore — any new Server Action must do the same; don't rely on the client having already gated access.

## Almost everything is a client component; data flows through Server Actions

Pages, layouts (besides the root), and `app/components/*` are `'use client'`. There are no server-rendered data-fetching components — data fetching happens client-side via `useEffect`/`useCallback` in `app/services/curriculumService.ts`, which calls `'use server'` functions in `app/actions.ts`. The only other server code is `app/api/auth/route.ts` (session read/write only, since Server Actions can't run pre-hydration). **Follow this pattern for new pages** — don't introduce a server-rendered data-fetching component; it'd be inconsistent with everything else here. Route params are `Promise`-typed and unwrapped with `React.use(params)` (Next 15 style).

## Curriculum content is versioned and append-only

`app/actions.ts` writes to two collections: `curriculum` (live doc) and `curriculum_versions` (history). **Every** `saveCurriculumAction` call first writes a new `curriculum_versions` doc (`versionTimestamp`, `versionNumber: Date.now()`) before updating the live doc — there's no "save without versioning" path, and `restoreVersionAction` re-runs `saveCurriculumAction`, so restoring old content creates yet another new version rather than deleting forward history. If you touch save/restore logic, preserve this invariant. Timestamps are hand-serialized between Admin SDK `Timestamp` and `{seconds, nanoseconds}` (`serializeTimestamp`/`deserializeTimestamp`) since Server Action payloads must be JSON-serializable — do the same for any new timestamp field.

## Content rendering is a hand-rolled parser, not a markdown library

`app/components/renderContent.tsx`'s `renderContentHelper` is a bespoke line-by-line parser — new content syntax (e.g. a new fenced-block type) has to be added there by hand, not by reaching for a markdown library. Fenced blocks tagged `scratch`/`scratchblocks` render via `scratchblocks-react`; everything else goes through `react-syntax-highlighter`'s `Prism` with the `oneLight` theme. Rendering is deferred behind a `mounted` state to avoid SSR/client mismatch (the parser touches `document`).

## Types

`@/*` maps to the repo root (`tsconfig.json`). `SessionData` lives in `lib/session.ts`; `CurriculumItem`/`CurriculumVersion` live in `app/services/curriculumService.ts` (not a central types file). Third-party module shims (`scratchblocks-react`, `react-diff-viewer`, etc.) live in `app/types.d.ts`.

## Testing

Jest + React Testing Library, `__tests__/*.test.{ts,tsx}` named after the file under test. `next/headers` is globally mocked via `__mocks__/next-headers.ts` (fake cookie store on `global.mockCookieStore`) but individual tests often re-`jest.mock('next/headers')`/`jest.mock('iron-session')` locally for finer control. Firestore (both Admin and client SDKs) is mocked globally in `jest.setup.ts`. `react-syntax-highlighter` and `scratchblocks-react` get lightweight per-test mocks to keep JSDOM output diffable — follow that pattern rather than rendering them for real in new tests.

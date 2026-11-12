@AGENTS.md

# Codebase Conventions for AI Assistants

Read [README.md](README.md) first (architecture, setup, emulator/`db:pull`/`db:seed` workflow). This file holds the rules every change must follow; the `docs/` pages it links hold the details. This repo is **independent**: its own Firebase project, not shared with `admin` or `portal`.

## One file is shared with admin and portal: `app/data/courses.json`

It is a verbatim copy of admin's `src/lib/data/courses.json`. **Never hand-edit it; edit it in admin and copy it here.** `__tests__/courses.test.ts` fails if it disagrees with `app/data/tracks.ts`, so a new course goes into admin's catalog first. Course ids are case-sensitive URL segments (`/cs/webdevA` works, `/cs/webdeva` doesn't). Details: [docs/courses-catalog.md](docs/courses-catalog.md).

## Middleware lives in `proxy.ts`, not `middleware.ts`

The entry point is `proxy.ts` (exported as `proxy`, with its own `matcher`), the convention for current Next.js versions. To change auth/session gating, edit `proxy.ts`; don't create a `middleware.ts`.

## Auth is a 2-role session cookie, and every Server Action re-checks it

`lib/session.ts` defines `SessionData { username, role: 'viewer' | 'editor', isLoggedIn }` in an iron-session cookie (`gbstem_session`, 7-day TTL). The two accounts, `viewer` and `editor`, are checked against `NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD` / `NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD` in `app/api/auth/route.ts`. `proxy.ts` redirects unauthenticated requests to `/login` and calls `session.save()` on every authenticated request, so an active user's session slides and never expires. **The client-side `useSession` hook (`lib/useSession.tsx`) is UI-only: every Server Action in `app/actions.ts` must re-check `session.role` (`checkEditorAuth`/`checkViewerAuth`) before touching Firestore.**

## Almost everything is a client component; data flows through Server Actions

Pages, layouts (besides the root) and `app/components/*` are `'use client'`. Data is fetched client-side via `useEffect`/`useCallback` in `app/services/curriculumService.ts`, which calls the `'use server'` functions in `app/actions.ts`. The only other server code is `app/api/auth/route.ts` (session read/write, since Server Actions can't run before hydration). **New pages follow this pattern; don't add a server-rendered data-fetching component.** Route params are `Promise`-typed and unwrapped with `React.use(params)`.

## Curriculum content is versioned and append-only

`saveCurriculumAction` always writes a new `curriculum_versions` doc (`versionTimestamp`, `versionNumber: Date.now()`) before updating the live `curriculum` doc; there is no unversioned save. `restoreVersionAction` re-runs `saveCurriculumAction`, so a restore adds a version instead of deleting history. **Preserve this invariant.** Timestamps cross the Server Action boundary hand-serialized as `{seconds, nanoseconds}` (`serializeTimestamp`/`deserializeTimestamp`); do the same for any new timestamp field.

## Content rendering is a hand-rolled parser, not a markdown library

New content syntax (e.g. a new fenced-block type) goes into `renderContentHelper` in `app/components/renderContent.tsx` by hand. Fenced `scratch`/`scratchblocks` blocks render via `scratchblocks-react`; everything else via `react-syntax-highlighter`'s `Prism` with the `oneLight` theme. Rendering waits on a `mounted` state because the parser touches `document`.

## Styling is Tailwind only

Bootstrap is gone and lint rejects unknown classes. Widgets are Headless UI, and every dialog uses `app/components/Modal.tsx`. Tokens (colors, Bootstrap-sized breakpoints, so `lg:` is 992px), `btn`/`input` classes and `site-container` live in `app/globals.css`: add a token rather than repeating an arbitrary value. **Never run `eslint --fix` without checking the diff**: its Tailwind autofix changes layouts. Details and traps: [docs/styling.md](docs/styling.md).

## Types

`@/*` maps to the repo root. `SessionData` lives in `lib/session.ts`; `CurriculumItem`/`CurriculumVersion` live in `app/services/curriculumService.ts` (there's no central types file). Third-party module shims (`scratchblocks-react`, `react-diff-viewer`, etc.) live in `app/types.d.ts`.

## Testing

Jest + React Testing Library, `__tests__/*.test.{ts,tsx}` named after the file under test. `next/headers` is mocked globally via `__mocks__/next-headers.ts` (fake cookie store on `global.mockCookieStore`), though tests often re-`jest.mock('next/headers')`/`jest.mock('iron-session')` locally. Firestore (Admin and client SDKs) is mocked globally in `jest.setup.ts`. `react-syntax-highlighter` and `scratchblocks-react` get lightweight per-test mocks to keep JSDOM output diffable; do the same in new tests.

# `app/data/courses.json`: the one file shared with admin and portal

This repo is otherwise independent of admin and portal. `app/data/courses.json` is a **verbatim copy** of the admin repo's `src/lib/data/courses.json` — the catalog of which courses gbSTEM actually offers each semester — shared the same way `semesterDates.json` is shared between admin, portal and website. **Edit it in admin and copy it here**, per admin's README section "Adding a New Semester"; never hand-edit this copy, because the next rollover overwrites it.

## Why the test exists

Portal builds every `curriculum.gbstem.org` link an instructor clicks by deriving `/{track}/{id}` straight from that catalog, so an id it contains that this repo has no page for is a dead link in a live dashboard. `__tests__/courses.test.ts` is what keeps the two in step: it fails if the catalog and [`app/data/tracks.ts`](../app/data/tracks.ts) disagree about which courses exist, which track one belongs to, or what its URL is. **Adding a course to `tracks.ts` alone will fail that test** — add it to the catalog in admin first.

## Course ids are case-sensitive URL segments

`app/[track]/[course]/page.tsx` lowercases the track segment before lookup but **not** the course segment, so `/cs/webdevA` resolves and `/cs/webdeva` throws "Class not found". Course ids are case-sensitive URL segments, not just keys.

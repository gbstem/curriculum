import courses from '../app/data/courses.json';
import { tracks } from '../app/data/tracks';

/**
 * `app/data/courses.json` is a verbatim copy of the admin repo's
 * `src/lib/data/courses.json` — the shared catalog of which courses gbSTEM
 * offers, mastered in admin and copied here and into portal the same way
 * `semesterDates.json` already is (see admin's README, "Adding a New
 * Semester").
 *
 * Portal builds every curriculum.gbstem.org link from it as
 * `/{track}/{id}`, so an id here that this repo has no page for is a dead
 * link in a live instructor's dashboard. That is what these tests exist to
 * catch: the copy step for `semesterDates.json` has been in the README for
 * a year with nothing enforcing it, and it drifted anyway (portal's
 * `springCourses.json` silently became a duplicate of its own fall file).
 * Documentation alone does not hold two repos together; a failing test does.
 */

const courseToTrack = new Map<string, string>();
tracks.forEach((track) =>
  track.courses.forEach((course) => courseToTrack.set(course.id, track.id))
);

describe('shared course catalog', () => {
  it('gives every offered course a page in this repo', () => {
    const missing = courses.filter((c) => !courseToTrack.has(c.id));
    expect(missing.map((c) => c.id)).toEqual([]);
  });

  it('offers every course this repo has a page for', () => {
    const ids = new Set(courses.map((c) => c.id));
    const orphaned = [...courseToTrack.keys()].filter((id) => !ids.has(id));
    expect(orphaned).toEqual([]);
  });

  it('files every course under the track its URL uses', () => {
    const misfiled = courses
      .filter((c) => courseToTrack.has(c.id) && courseToTrack.get(c.id) !== c.track)
      .map((c) => `${c.id}: catalog says ${c.track}, tracks.ts says ${courseToTrack.get(c.id)}`);
    expect(misfiled).toEqual([]);
  });

  it('offers the same number of courses each semester', () => {
    const fall = courses.filter((c) => c.semester === 'fall');
    const spring = courses.filter((c) => c.semester === 'spring');
    expect(fall.length).toBe(spring.length);
    expect(fall.length).toBeGreaterThan(0);
  });

  it('has no duplicate ids', () => {
    expect(new Set(courses.map((c) => c.id)).size).toBe(courses.length);
  });

  it('names each course uniquely within a semester', () => {
    // Portal looks a course up by the name stored on the class document,
    // scoped to the current semester - two courses sharing a name there
    // would make that lookup pick one arbitrarily.
    for (const semester of ['fall', 'spring']) {
      const names = courses.filter((c) => c.semester === semester).map((c) => c.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });
});

describe('tracks.ts hrefs', () => {
  // Portal derives its links as `/{track}/{id}` rather than reading these
  // hand-written strings, so a typo here would send the two repos to
  // different URLs for the same course without either one erroring.
  it('link to /{track}/{course} for every course', () => {
    const wrong: string[] = [];
    tracks.forEach((track) =>
      track.courses.forEach((course) =>
        course.links.forEach((link) => {
          const expected = `/${track.id}/${course.id}`;
          if (link.href !== expected) {
            wrong.push(`${course.id}: ${link.href} !== ${expected}`);
          }
        })
      )
    );
    expect(wrong).toEqual([]);
  });

  it('link to a real course from every dropdown item', () => {
    const wrong: string[] = [];
    tracks.forEach((track) =>
      track.dropdownItems.forEach((item) => {
        const id = item.href.split('/').pop();
        if (item.href !== `/${track.id}/${id}` || courseToTrack.get(id ?? '') !== track.id) {
          wrong.push(`${track.id} dropdown: ${item.href}`);
        }
      })
    );
    expect(wrong).toEqual([]);
  });

  it('lists every course of a track in its dropdown', () => {
    tracks.forEach((track) => {
      const dropdown = new Set(track.dropdownItems.map((item) => item.href.split('/').pop()));
      const missing = track.courses.map((c) => c.id).filter((id) => !dropdown.has(id));
      expect(missing).toEqual([]);
    });
  });
});

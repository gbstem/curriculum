'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import Alert, { AlertHeading } from '../../components/Alert';
import EditorModal from '../../components/EditorModal';
import Spinner from '../../components/Spinner';
import {
  CurriculumItem,
  getCurriculumByCourse,
  saveCurriculum,
} from '../../services/curriculumService';
import { tracks } from '../../data/tracks';

// The page's main column: two thirds of the page from lg up, centered.
const ROW = '-mx-3 flex flex-wrap';
const MAIN_COLUMN = 'mx-auto w-full shrink-0 px-3 lg:w-2/3';

interface PageProps {
  params: Promise<{ track: string; course: string }>;
}

export default function CourseLessonsPage({ params }: PageProps) {
  const { track, course } = React.use(params);
  const normalizedTrack = track.toLowerCase();

  // Validate track and course
  const trackData = tracks.find((t) => t.id === normalizedTrack);
  if (!trackData) {
    throw new Error('Track not found');
  }
  const courseData = trackData.courses.find((c) => c.id === course);
  if (!courseData) {
    throw new Error('Class not found');
  }

  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const loadCurriculum = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurriculumByCourse(course);
      setCurriculum(data);
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err.message || String(err)));
    } finally {
      setLoading(false);
    }
  }, [course]);

  useEffect(() => {
    loadCurriculum();
  }, [loadCurriculum]);

  // Many "B" (spring) courses intentionally have no content of their own --
  // instructors are meant to reuse the matching "A" (fall) course instead.
  const fallCourseId = course.endsWith('B') ? `${course.slice(0, -1)}A` : null;
  const fallCourseData = fallCourseId
    ? trackData.courses.find((c) => c.id === fallCourseId)
    : undefined;

  const [fallLessonCount, setFallLessonCount] = useState<number | null>(null);

  useEffect(() => {
    if (loading || curriculum.length > 0 || !fallCourseId || !fallCourseData) {
      setFallLessonCount(null);
      return;
    }
    let cancelled = false;
    getCurriculumByCourse(fallCourseId)
      .then((data) => {
        if (!cancelled) setFallLessonCount(data.length);
      })
      .catch(() => {
        if (!cancelled) setFallLessonCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, [loading, curriculum.length, fallCourseId, fallCourseData]);

  if (error) {
    throw error;
  }

  const handleSave = async (curriculumData: CurriculumItem) => {
    setSaving(true);
    try {
      await saveCurriculum(curriculumData);
      await loadCurriculum(); // Reload the data
    } catch (err: any) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  // Sort lessons by lessonNumber
  const sortedLessons = [...curriculum].sort(
    (a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0)
  );

  if (loading) {
    return (
      <div className="site-container mt-12 py-12">
        <div className={ROW}>
          <div className={`${MAIN_COLUMN} text-center`}>
            <Spinner />
            <p className="mt-4 text-muted">Loading lessons list...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="site-container mt-12">
        <div className={ROW}>
          <div className={MAIN_COLUMN}>
            <Alert>
              <AlertHeading>Error Loading Curriculum</AlertHeading>
              <p>{error}</p>
              <hr />
              <div className="flex justify-end">
                <Link href={`/${normalizedTrack}`} className="btn btn-outline-danger">
                  Back to Courses
                </Link>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  const courseTitle = courseData.title;

  return (
    <div>
      <main>
        <div className="bg-sky p-12 text-center text-white">
          <h1 className="text-display-4 font-bold narrow:text-[2.5rem]">
            {courseTitle} Curriculum
          </h1>
          <h3 className="mb-0 font-light">Complete Course Guide</h3>
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-banner btn-sm border-0 shadow-sm"
              onClick={() => setShowEditor(true)}
            >
              <i className="fas fa-plus me-1"></i>
              Add New Lesson
            </button>
          </div>
        </div>

        <div className="site-container mt-12 py-6">
          <div className={ROW}>
            <div className={MAIN_COLUMN}>
              {curriculum.length === 0 ? (
                <div className="rounded-md bg-white py-12 text-center shadow-sm">
                  <i className="fas fa-book fa-3x mb-4 text-muted"></i>
                  <h4>
                    No lessons found for {courseTitle}
                    {fallLessonCount !== null && fallLessonCount > 0 && fallCourseData && (
                      <>
                        {' '}
                        but{' '}
                        <Link
                          href={`/${normalizedTrack}/${fallCourseId}`}
                          style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
                        >
                          {fallLessonCount} lesson{fallLessonCount === 1 ? '' : 's'}{' '}
                          {fallLessonCount === 1 ? 'was' : 'were'} found for {fallCourseData.title}
                        </Link>
                      </>
                    )}
                  </h4>
                  <p className="mb-6 text-muted">Start by adding your first lesson!</p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowEditor(true)}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Add First Lesson
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {/* TODO: `self-start` keeps each lesson button its own height, as before. Without
                      it, both buttons in a row would be as tall as the taller one. */}
                  {sortedLessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      href={`/${normalizedTrack}/${course}/lesson/${lesson.lessonNumber}`}
                      className="btn btn-primary btn-lg flex min-h-16 w-full items-center justify-center self-start text-center whitespace-pre-line text-white shadow-sm hover:transform-[scale(1.02)]"
                      data-testid="lesson-link"
                    >
                      Lesson {lesson.lessonNumber}: {lesson.title}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-12 mb-6 text-center">
                <Link href={`/${normalizedTrack}`} className="btn btn-secondary">
                  ← Back to {trackData.shortTitle} Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Editor Modal for adding new lessons */}
      <EditorModal
        show={showEditor}
        onHide={() => setShowEditor(false)}
        curriculumData={{ course }}
        onSave={handleSave}
        isLoading={saving}
      />
    </div>
  );
}

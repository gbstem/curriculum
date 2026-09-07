'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import EditorModal from '../../components/EditorModal';
import {
  CurriculumItem,
  getCurriculumByCourse,
  saveCurriculum,
} from '../../services/curriculumService';
import { tracks } from '../../data/tracks';

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
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="text-muted mt-3">Loading lessons list...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <Alert variant="danger">
              <Alert.Heading>Error Loading Curriculum</Alert.Heading>
              <p>{error}</p>
              <hr />
              <div className="d-flex justify-content-end">
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
        <div className="bg-[#67aeda] p-5 text-center text-white">
          <h1 className="display-4 fw-bold">{courseTitle} Curriculum</h1>
          <h3 className="fw-light mb-0 font-extralight">Complete Course Guide</h3>
          <div className="mt-3">
            <Button
              variant="outline-light"
              className="btn-primary border-0 shadow-sm"
              size="sm"
              onClick={() => setShowEditor(true)}
            >
              <i className="fas fa-plus me-1"></i>
              Add New Lesson
            </Button>
          </div>
        </div>

        <div className="container mt-5 py-4">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {curriculum.length === 0 ? (
                <div className="rounded bg-white py-5 text-center shadow-sm">
                  <i className="fas fa-book fa-3x text-muted mb-3"></i>
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
                  <p className="text-muted mb-4">Start by adding your first lesson!</p>
                  <Button
                    variant="primary"
                    className="btn-primary"
                    onClick={() => setShowEditor(true)}
                  >
                    <i className="fas fa-plus me-1"></i>
                    Add First Lesson
                  </Button>
                </div>
              ) : (
                <div className="row g-3">
                  {sortedLessons.map((lesson) => (
                    <div key={lesson.id} className="col-md-6">
                      <Link
                        href={`/${normalizedTrack}/${course}/lesson/${lesson.lessonNumber}`}
                        className="btn btn-primary btn-lg lesson-link d-flex align-items-center justify-content-center min-h-[64px] w-100 text-white shadow-sm"
                      >
                        Lesson {lesson.lessonNumber}: {lesson.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 mb-4 text-center">
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

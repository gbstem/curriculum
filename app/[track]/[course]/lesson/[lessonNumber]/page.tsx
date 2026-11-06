'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import Alert, { AlertHeading } from '../../../../components/Alert';
import EditorModal from '../../../../components/EditorModal';
import Spinner from '../../../../components/Spinner';
import VersionHistoryModal from '../../../../components/VersionHistoryModal';
import { LESSON_TEXT, RenderContent } from '../../../../components/renderContent';
import { tracks } from '../../../../data/tracks';
import {
  CurriculumItem,
  getCurriculumByCourse,
  getCurriculumByCourseAndLesson,
  saveCurriculum,
} from '../../../../services/curriculumService';

// The page's main column: two thirds of the page from lg up, centered.
const ROW = '-mx-3 flex flex-wrap';
const MAIN_COLUMN = 'mx-auto w-full shrink-0 px-3 lg:w-2/3';

interface PageProps {
  params: Promise<{
    track: string;
    course: string;
    lessonNumber: string;
  }>;
}

export default function LessonDetailsPage({ params }: PageProps) {
  const { track, course, lessonNumber } = React.use(params);
  const normalizedTrack = track.toLowerCase();
  const currentLessonNum = parseInt(lessonNumber, 10);

  // Validate track, course, and lessonNumber
  const trackData = tracks.find((t) => t.id === normalizedTrack);
  if (!trackData) {
    throw new Error('Track not found');
  }
  const courseData = trackData.courses.find((c) => c.id === course);
  if (!courseData) {
    throw new Error('Class not found');
  }
  if (isNaN(currentLessonNum)) {
    throw new Error('Lesson not found');
  }

  const [lessonData, setLessonData] = useState<CurriculumItem | null>(null);
  const [allLessons, setAllLessons] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [showVersionHistory, setShowVersionHistory] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const loadLessonData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCurriculumByCourseAndLesson(course, currentLessonNum);
      if (data) {
        setLessonData(data);
      } else {
        setError(new Error('Lesson not found'));
      }

      // Also load all lessons in the course to build navigation
      const courseLessons = await getCurriculumByCourse(course);
      setAllLessons(courseLessons);
    } catch (err: any) {
      console.error('Error loading lesson:', err);
      setError(err instanceof Error ? err : new Error(err.message || String(err)));
    } finally {
      setLoading(false);
    }
  }, [course, currentLessonNum]);

  useEffect(() => {
    if (course && !isNaN(currentLessonNum)) {
      loadLessonData();
    }
  }, [course, currentLessonNum, loadLessonData]);

  if (error) {
    throw error;
  }

  const handleSave = async (curriculumData: CurriculumItem) => {
    setSaving(true);
    try {
      await saveCurriculum(curriculumData);
      await loadLessonData(); // Reload the data
    } catch (err: any) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="site-container mt-12 py-12 text-center">
        <Spinner />
        <p className="mt-4 text-muted">Loading lesson details...</p>
      </div>
    );
  }

  const curriculumPath = `/${normalizedTrack}/${course}`;

  if (error || !lessonData) {
    return (
      <div className="site-container mt-12 py-6">
        <div className={ROW}>
          <div className={MAIN_COLUMN}>
            <Alert>
              <AlertHeading>Error Loading Lesson</AlertHeading>
              <p>{error || 'Lesson not found'}</p>
              <hr />
              <div className="flex justify-end">
                <Link href={curriculumPath} className="btn btn-outline-danger">
                  Back to Curriculum
                </Link>
              </div>
            </Alert>
          </div>
        </div>
      </div>
    );
  }

  // Calculate prev and next lessons
  const sortedLessons = [...allLessons].sort(
    (a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0)
  );
  const currentIndex = sortedLessons.findIndex((l) => l.lessonNumber === currentLessonNum);

  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < sortedLessons.length - 1 && currentIndex !== -1
      ? sortedLessons[currentIndex + 1]
      : null;

  const displayTitle = lessonData.title;
  const displayLessonNumber = lessonData.lessonNumber;
  const displayContent = lessonData.content;

  return (
    <div>
      <main>
        <div className="bg-sky p-12 text-center text-white">
          <h1 className="mb-2 text-display-5 font-bold">{displayTitle}</h1>
          <p className="mb-0 text-h5">Lesson {displayLessonNumber}</p>

          <div className="mt-4 flex justify-center gap-2">
            <button
              type="button"
              className="btn btn-banner btn-sm border-0 shadow-sm"
              onClick={() => setShowEditor(true)}
            >
              <i className="fas fa-edit me-1"></i>
              Edit Lesson
            </button>
            <button
              type="button"
              className="btn btn-banner btn-sm border-0 shadow-sm"
              onClick={() => setShowVersionHistory(true)}
            >
              <i className="fas fa-history me-1"></i>
              Version History
            </button>
          </div>
        </div>

        <div className="site-container mt-12 py-6">
          <div className={ROW}>
            <div className={MAIN_COLUMN}>
              <div className="relative flex min-w-0 flex-col overflow-hidden rounded-card bg-white wrap-break-word shadow-sm">
                <div
                  className={`flex-auto p-6 md:p-12 ${LESSON_TEXT}`}
                  data-testid="lesson-content"
                >
                  <RenderContent content={displayContent} />
                </div>
              </div>

              <div
                className="mt-6 mb-12 flex w-full items-center rounded-xl bg-[linear-gradient(135deg,#f8f9fa_0%,#e9ecef_100%)] p-6 shadow-sm narrow:flex-col narrow:gap-4"
                data-testid="lesson-navigation"
              >
                <div className="flex-1 text-start">
                  {prevLesson && (
                    <Link
                      href={`/${normalizedTrack}/${course}/lesson/${prevLesson.lessonNumber}`}
                      className="btn btn-primary inline-flex items-center gap-1 text-white narrow:w-full"
                    >
                      ← Prev
                    </Link>
                  )}
                </div>
                <div className="flex-1 text-center">
                  <Link
                    href={curriculumPath}
                    className="btn btn-outline-primary inline-flex items-center gap-1 narrow:w-full"
                  >
                    📚 Curriculum
                  </Link>
                </div>
                <div className="flex-1 text-end">
                  {nextLesson && (
                    <Link
                      href={`/${normalizedTrack}/${course}/lesson/${nextLesson.lessonNumber}`}
                      className="btn btn-primary inline-flex items-center gap-1 text-white narrow:w-full"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Editor Modal */}
      <EditorModal
        show={showEditor}
        onHide={() => setShowEditor(false)}
        curriculumData={lessonData}
        onSave={handleSave}
        isLoading={saving}
      />

      {/* Version History Modal */}
      <VersionHistoryModal
        show={showVersionHistory}
        onHide={() => setShowVersionHistory(false)}
        course={course}
        lessonNumber={currentLessonNum}
        curriculumId={lessonData.id}
        currentContent={lessonData.content}
      />
    </div>
  );
}

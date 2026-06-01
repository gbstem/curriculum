'use client';

import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import EditorModal from '../../../../components/EditorModal';
import VersionHistoryModal from '../../../../components/VersionHistoryModal';
import { RenderContent } from '../../../../components/renderContent';
import {
  CurriculumItem,
  getCurriculumByCourse,
  getCurriculumByCourseAndLesson,
  saveCurriculum,
} from '../../../../services/curriculumService';
import { tracks } from '../../../../data/tracks';

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
      <div className="container mt-5 py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="text-muted mt-3">Loading lesson details...</p>
      </div>
    );
  }

  const curriculumPath = `/${normalizedTrack}/${course}`;

  if (error || !lessonData) {
    return (
      <div className="container mt-5 py-4">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <Alert variant="danger">
              <Alert.Heading>Error Loading Lesson</Alert.Heading>
              <p>{error || 'Lesson not found'}</p>
              <hr />
              <div className="d-flex justify-content-end">
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
  const displayModuleTitle = lessonData.moduleTitle;
  const displayLessonNumber = lessonData.lessonNumber;
  const displayContent = lessonData.content;

  return (
    <div>
      <main>
        <div style={{ backgroundColor: '#67aeda' }} className="p-5 text-center text-white">
          <h1 className="fw-bold display-5 mb-2">{displayTitle}</h1>
          <h3 className="fw-light mb-3" style={{ fontWeight: '200' }}>
            Module: {displayModuleTitle}
          </h3>
          <p className="fs-5 mb-0">Lesson {displayLessonNumber}</p>

          <div className="d-flex justify-content-center mt-3 gap-2">
            <Button
              variant="outline-light"
              size="sm"
              className="btn-primary border-0 shadow-sm"
              onClick={() => setShowEditor(true)}
            >
              <i className="fas fa-edit me-1"></i>
              Edit Lesson
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="btn-primary border-0 shadow-sm"
              onClick={() => setShowVersionHistory(true)}
            >
              <i className="fas fa-history me-1"></i>
              Version History
            </Button>
          </div>
        </div>

        <div className="container mt-5 py-4">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="card border-0 shadow-sm">
                <div className="card-body curriculum-content p-md-5 p-4">
                  <RenderContent content={displayContent} />
                </div>
              </div>

              <div className="d-flex lesson-navigation align-items-center mt-4 mb-5 w-100 shadow-sm">
                <div className="text-start" style={{ flex: 1 }}>
                  {prevLesson && (
                    <Link
                      href={`/${normalizedTrack}/${course}/lesson/${prevLesson.lessonNumber}`}
                      className="btn btn-primary d-inline-flex align-items-center gap-1 text-white"
                    >
                      ← Prev
                    </Link>
                  )}
                </div>
                <div className="text-center" style={{ flex: 1 }}>
                  <Link
                    href={curriculumPath}
                    className="btn btn-outline-primary d-inline-flex align-items-center gap-1"
                  >
                    📚 Curriculum
                  </Link>
                </div>
                <div className="text-end" style={{ flex: 1 }}>
                  {nextLesson && (
                    <Link
                      href={`/${normalizedTrack}/${course}/lesson/${nextLesson.lessonNumber}`}
                      className="btn btn-primary d-inline-flex align-items-center gap-1 text-white"
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

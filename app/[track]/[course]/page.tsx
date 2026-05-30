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

interface PageProps {
  params: Promise<{ track: string; course: string }>;
}

export default function CourseLessonsPage({ params }: PageProps) {
  const { track, course } = React.use(params);
  const normalizedTrack = track.toLowerCase();

  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const getTrackDisplayName = (tr: string) => {
    switch (tr) {
      case 'cs':
        return 'CS';
      case 'math':
        return 'Math';
      case 'science':
        return 'Science';
      case 'engineering':
        return 'Engineering';
      default:
        return tr.toUpperCase();
    }
  };

  const getCourseTitle = (c: string): string => {
    const courseMap: Record<string, string> = {
      // CS
      python1A: 'Python 1A',
      python1B: 'Python 1B',
      python2A: 'Python 2A',
      python2B: 'Python 2B',
      scratch1A: 'Scratch 1A',
      scratch1B: 'Scratch 1B',
      scratch2A: 'Scratch 2A',
      scratch2B: 'Scratch 2B',
      webdevA: 'Web Development A',
      webdevB: 'Web Development B',
      // Math
      math1A: 'Math 1A',
      math1B: 'Math 1B',
      math2A: 'Math 2A',
      math2B: 'Math 2B',
      math3A: 'Math 3A',
      math3B: 'Math 3B',
      math4A: 'Math 4A',
      math4B: 'Math 4B',
      math5A: 'Math 5A',
      math5B: 'Math 5B',
      // Science
      environmentalA: 'Environmental Science A',
      environmentalB: 'Environmental Science B',
      physicsA: 'Physics A',
      physicsB: 'Physics B',
      // Engineering
      engineering1A: 'Engineering 1A',
      engineering1B: 'Engineering 1B',
      engineering2A: 'Engineering 2A',
      engineering2B: 'Engineering 2B',
      engineering3A: 'Engineering 3A',
      engineering3B: 'Engineering 3B',
    };
    return courseMap[c] || c;
  };

  const loadCurriculum = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getCurriculumByCourse(course);
      setCurriculum(data);
    } catch (err: any) {
      setError('Error loading curriculum: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [course]);

  useEffect(() => {
    loadCurriculum();
  }, [loadCurriculum]);

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

  const courseTitle = getCourseTitle(course);

  return (
    <div>
      <main>
        <div style={{ backgroundColor: '#67aeda' }} className="p-5 text-center text-white">
          <h1 className="display-4 fw-bold">{courseTitle} Curriculum</h1>
          <h3 className="fw-light mb-0" style={{ fontWeight: 200 }}>
            Complete Course Guide
          </h3>
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
                  <h4>No lessons found for {courseTitle}</h4>
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
                        className="btn btn-primary btn-lg lesson-link d-flex align-items-center justify-content-center w-100 text-white shadow-sm"
                        style={{ minHeight: '64px' }}
                      >
                        Lesson {lesson.lessonNumber}: {lesson.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 mb-4 text-center">
                <Link href={`/${normalizedTrack}`} className="btn btn-secondary">
                  ← Back to {getTrackDisplayName(normalizedTrack)} Courses
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

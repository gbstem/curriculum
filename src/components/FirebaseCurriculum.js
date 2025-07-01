import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { getCurriculumByCourse } from '../services/curriculumService';
import EditorModal from './EditorModal';

const FirebaseCurriculum = ({ course, courseTitle, backToCourses = "/cs" }) => {
    const [curriculum, setCurriculum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadCurriculum();
    }, [course]);

    const loadCurriculum = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getCurriculumByCourse(course);
            setCurriculum(data);
        } catch (err) {
            setError('Error loading curriculum: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (curriculumData) => {
        setSaving(true);
        try {
            const { saveCurriculum } = await import('../services/curriculumService');
            await saveCurriculum(curriculumData);
            await loadCurriculum(); // Reload the data
        } catch (err) {
            throw err;
        } finally {
            setSaving(false);
        }
    };

    // Sort lessons by lessonNumber
    const sortedLessons = [...curriculum].sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-3">Loading curriculum...</p>
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
                                <Link to={backToCourses} className="btn btn-outline-danger">
                                    Back to Courses
                                </Link>
                            </div>
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <main>
                <div style={{ backgroundColor: "#67aeda" }} className="text-center p-5">
                    <h1>{courseTitle} Curriculum</h1>
                    <h3 style={{ fontWeight: "200" }}>Complete Course Guide</h3>
                    <div className="mt-3">
                        <Button 
                            variant="outline-light" 
                            className="btn-primary"
                            size="sm"
                            onClick={() => setShowEditor(true)}
                        >
                            <i className="fas fa-plus me-1"></i>
                            Add New Lesson
                        </Button>
                    </div>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            {curriculum.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="fas fa-book fa-3x text-muted mb-3"></i>
                                    <h4>No lessons found</h4>
                                    <p className="text-muted">Start by adding your first lesson!</p>
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
                                <div className="row">
                                    {sortedLessons.map((lesson) => (
                                        <div key={lesson.id} className="col-md-6 mb-2">
                                            <Link 
                                                to={`/cs/${course}/lesson/${lesson.lessonNumber}`}
                                                className="btn text-white btn-primary btn-sm w-100 lesson-link"
                                            >
                                                Lesson {lesson.lessonNumber}: {lesson.title}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="text-center mt-5 mb-4">
                                <Link to={backToCourses} className="btn btn-secondary me-3">
                                    ← Back to CS Courses
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
};

export default FirebaseCurriculum; 

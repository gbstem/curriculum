import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './curriculum.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ScratchBlocks from 'scratchblocks-react';
import { marked } from 'marked';
import { getCurriculumByCourseAndLesson } from './services/curriculumService';
import EditorModal from './components/EditorModal';
import VersionHistoryModal from './components/VersionHistoryModal';

// Configure marked for scratchblocks support
const renderer = new marked.Renderer();
const originalCodeRenderer = renderer.code.bind(renderer);

renderer.code = (code, language) => {
    if (language === 'scratch' || language === 'scratchblocks') {
        return `
            <div style="margin: 1rem 0;">
                <div class="scratch-blocks-container" data-code="${encodeURIComponent(code)}"></div>
            </div>
        `;
    }
    return originalCodeRenderer(code, language);
};

marked.use({ renderer });

const LessonPage = ({ 
    title, 
    moduleTitle, 
    lessonNumber, 
    content, 
    prevLesson, 
    nextLesson, 
    backToCurriculum = "/cs/python1/",
    useFirebase = false,
    course = null
}) => {
    const { courseParam, lessonParam } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [showVersionHistory, setShowVersionHistory] = useState(false);
    const [saving, setSaving] = useState(false);

    // Determine if we should use Firebase data
    const shouldUseFirebase = useFirebase || (courseParam && lessonParam);
    const currentCourse = course || courseParam;
    const currentLessonNumber = lessonNumber || parseInt(lessonParam);

    useEffect(() => {
        if (shouldUseFirebase && currentCourse && currentLessonNumber) {
            loadLessonData();
        }
    }, [shouldUseFirebase, currentCourse, currentLessonNumber]);

    const loadLessonData = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getCurriculumByCourseAndLesson(currentCourse, currentLessonNumber);
            if (data) {
                setLessonData(data);
            } else {
                setError('Lesson not found');
            }
        } catch (err) {
            setError('Error loading lesson: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (curriculumData) => {
        setSaving(true);
        try {
            const { saveCurriculum } = await import('./services/curriculumService');
            await saveCurriculum(curriculumData);
            await loadLessonData(); // Reload the data
        } catch (err) {
            throw err;
        } finally {
            setSaving(false);
        }
    };

    // Use Firebase data if available, otherwise fall back to props
    const displayTitle = lessonData?.title || title;
    const displayModuleTitle = lessonData?.moduleTitle || moduleTitle;
    const displayLessonNumber = lessonData?.lessonNumber || currentLessonNumber;
    const displayContent = lessonData?.content || content;

    // Function to render content with markdown-like formatting
    const renderContent = (text) => {
        if (!text) return null;
        
        // Use marked for better markdown rendering
        const htmlContent = marked(text);
        
        return (
            <div 
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="markdown-content"
            />
        );
    };

    // Render scratchblocks after the component mounts
    useEffect(() => {
        if (displayContent) {
            // Find all scratch blocks containers and render them
            const scratchContainers = document.querySelectorAll('.scratch-blocks-container');
            scratchContainers.forEach(container => {
                const code = decodeURIComponent(container.dataset.code);
                try {
                    const scratchElement = ScratchBlocks.render(code, {
                        style: 'scratch3'
                    });
                    container.appendChild(scratchElement);
                } catch (err) {
                    console.error('Error rendering scratch blocks:', err);
                    container.innerHTML = `<pre><code>${code}</code></pre>`;
                }
            });
        }
    }, [displayContent]);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-3">Loading lesson...</p>
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
                            <Alert.Heading>Error Loading Lesson</Alert.Heading>
                            <p>{error}</p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Link to={backToCurriculum} className="btn btn-outline-danger">
                                    Back to Curriculum
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
                    <h1>{displayTitle}</h1>
                    <h3 style={{ fontWeight: "200" }}>Module: {displayModuleTitle}</h3>
                    <p className="mb-0">Lesson {displayLessonNumber}</p>
                    
                    {shouldUseFirebase && (
                        <div className="mt-3">
                            <Button 
                                variant="outline-light" 
                                size="sm" 
                                className="me-2"
                                onClick={() => setShowEditor(true)}
                            >
                                <i className="fas fa-edit me-1"></i>
                                Edit Lesson
                            </Button>
                            <Button 
                                variant="outline-light" 
                                size="sm"
                                onClick={() => setShowVersionHistory(true)}
                            >
                                <i className="fas fa-history me-1"></i>
                                Version History
                            </Button>
                        </div>
                    )}
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card shadow-sm">
                                <div className="card-body curriculum-content">
                                    {renderContent(displayContent)}
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mt-4 mb-5 lesson-navigation">
                                <div>
                                    {prevLesson && (
                                        <Link to={prevLesson} className="btn btn-secondary">
                                            ← Previous Lesson
                                        </Link>
                                    )}
                                </div>
                                <div>
                                    <Link to={backToCurriculum} className="btn btn-secondary me-2">
                                        📚 Curriculum
                                    </Link>
                                    {nextLesson && (
                                        <Link to={nextLesson} className="btn btn-primary">
                                            Next Lesson →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Editor Modal */}
            {shouldUseFirebase && (
                <EditorModal
                    show={showEditor}
                    onHide={() => setShowEditor(false)}
                    curriculumData={lessonData}
                    onSave={handleSave}
                    isLoading={saving}
                />
            )}

            {/* Version History Modal */}
            {shouldUseFirebase && (
                <VersionHistoryModal
                    show={showVersionHistory}
                    onHide={() => setShowVersionHistory(false)}
                    course={currentCourse}
                    lessonNumber={currentLessonNumber}
                />
            )}
        </div>
    );
};

export default LessonPage; 

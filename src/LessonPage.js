import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './curriculum.css';

import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import ScratchBlocks from 'scratchblocks-react';
import { marked } from 'marked';
import { getCurriculumByCourseAndLesson } from './services/curriculumService';
import EditorModal from './components/EditorModal';
import VersionHistoryModal from './components/VersionHistoryModal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Configure marked for scratchblocks and highlight.js support
const renderer = new marked.Renderer();

renderer.code = (code, language) => {
    if (language === 'scratch' || language === 'scratchblocks') {
        console.log('Rendering scratch blocks:', code);
        return `
            <div style="margin: 1rem 0;">
                <div class="scratch-blocks-container" data-code="${encodeURIComponent(code)}"></div>
            </div>
        `;
    }
    // For other code blocks, use highlight.js
    const validLang = language && hljs.getLanguage(language);
    const highlighted = validLang
        ? hljs.highlight(code, { language }).value
        : hljs.highlightAuto(code).value;
    return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
    }
});

marked.use({ renderer });

const LessonPage = ({ 
    title, 
    moduleTitle, 
    lessonNumber: propLessonNumber, 
    content, 
    prevLesson, 
    nextLesson, 
    backToCurriculum = "/cs/python1/",
    useFirebase = false,
    course: propCourse = null
}) => {
    const { course, lessonNumber } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showEditor, setShowEditor] = useState(false);
    const [showVersionHistory, setShowVersionHistory] = useState(false);
    const [saving, setSaving] = useState(false);

    // Determine if we should use Firebase data
    const shouldUseFirebase = useFirebase || (course && lessonNumber);
    const currentCourse = propCourse || course;
    const currentLessonNumber = propLessonNumber || parseInt(lessonNumber);

    console.log('LessonPage params:', { course, lessonNumber, currentCourse, currentLessonNumber, shouldUseFirebase });

    useEffect(() => {
        if (shouldUseFirebase && currentCourse && currentLessonNumber) {
            loadLessonData();
        }
    }, [shouldUseFirebase, currentCourse, currentLessonNumber]);

    const loadLessonData = async () => {
        setLoading(true);
        setError('');
        try {
            console.log('Loading lesson data:', { currentCourse, currentLessonNumber });
            const data = await getCurriculumByCourseAndLesson(currentCourse, currentLessonNumber);
            console.log('Lesson data received:', data);
            if (data) {
                setLessonData(data);
            } else {
                setError('Lesson not found');
            }
        } catch (err) {
            console.error('Error loading lesson:', err);
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
        
        // Split by lines and process each line
        const lines = text.split('\n');
        const elements = [];
        let inCodeBlock = false;
        let codeBlockLang = 'python';
        let codeBlockLines = [];
        
        lines.forEach((line, index) => {
            // Code block start/end
            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    // Try to get language (e.g., ```python or ```scratch)
                    const langMatch = line.match(/^```(\w+)/);
                    codeBlockLang = langMatch ? langMatch[1] : 'python';
                    codeBlockLines = [];
                } else {
                    // End of code block
                    inCodeBlock = false;
                    if (codeBlockLang === 'scratch' || codeBlockLang === 'scratchblocks') {
                        elements.push(
                            <div key={`scratchblock-${index}`} style={{ margin: '1rem 0' }}>
                                <ScratchBlocks blockStyle="scratch3">
                                    {codeBlockLines.join('\n')}
                                </ScratchBlocks>
                            </div>
                        );
                    } else {
                        elements.push(
                            <SyntaxHighlighter
                                key={`codeblock-${index}`}
                                language={codeBlockLang}
                                style={oneLight}
                                customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
                            >
                                {codeBlockLines.join('\n')}
                            </SyntaxHighlighter>
                        );
                    }
                    codeBlockLines = [];
                }
                return;
            }
            if (inCodeBlock) {
                codeBlockLines.push(line);
                return;
            }
            // Skip empty lines or null lines
            if (!line || line.trim() === '') {
                elements.push(<br key={`br-${index}`} />);
                return;
            }
            // Headers (lines starting with #)
            if (line.startsWith('#')) {
                const level = line.match(/^#+/)[0].length;
                const text = line.replace(/^#+\s*/, '');
                const HeaderTag = `h${Math.min(level + 2, 6)}`;
                elements.push(
                    React.createElement(HeaderTag, { 
                        key: `header-${index}`, 
                        className: "mt-4 mb-3" 
                    }, text)
                );
                return;
            }
            // Bold text (**text**)
            if (line.includes('**')) {
                const parts = line.split('**');
                const formattedParts = parts.map((part, partIndex) => {
                    if (partIndex % 2 === 1) {
                        return <strong key={`bold-${index}-${partIndex}`}>{part}</strong>;
                    }
                    return part;
                });
                elements.push(<p key={`p-${index}`} className="mb-2">{formattedParts}</p>);
                return;
            }
            // Lists (lines starting with - or *)
            if (line.match(/^[\s]*[-*]\s/)) {
                const text = line.replace(/^[\s]*[-*]\s/, '');
                elements.push(
                    <li key={`li-${index}`} className="mb-1">{text}</li>
                );
                return;
            }
            // Regular paragraphs
            elements.push(<p key={`p-${index}`} className="mb-2">{line}</p>);
        });
        return elements;
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

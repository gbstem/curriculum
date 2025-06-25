import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './curriculum.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LessonPage = ({ 
    title, 
    moduleTitle, 
    lessonNumber, 
    content, 
    prevLesson, 
    nextLesson, 
    backToCurriculum = "/cs/python1/" 
}) => {
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
            if (line.startsWith('\`\`\`')) {
                if (!inCodeBlock) {
                    inCodeBlock = true;
                    // Try to get language (e.g., \`\`\`python)
                    const langMatch = line.match(/^\`\`\`(\w+)/);
                    codeBlockLang = langMatch ? langMatch[1] : 'python';
                    codeBlockLines = [];
                } else {
                    // End of code block
                    inCodeBlock = false;
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

    return (
        <div>
            <main>
                <div style={{ backgroundColor: "#67aeda" }} className="text-center p-5">
                    <h1>{title}</h1>
                    <h3 style={{ fontWeight: "200" }}>Module: {moduleTitle}</h3>
                    <p className="mb-0">Lesson {lessonNumber}</p>
                </div>

                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card shadow-sm">
                                <div className="card-body curriculum-content">
                                    {renderContent(content)}
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
        </div>
    );
};

export default LessonPage; 

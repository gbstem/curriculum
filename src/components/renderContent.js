import React from 'react';
import ScratchBlocks from 'scratchblocks-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function renderContent(text) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockLang = 'python';
    let codeBlockLines = [];
    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                const langMatch = line.match(/^```(\w+)/);
                codeBlockLang = langMatch ? langMatch[1] : 'python';
                codeBlockLines = [];
            } else {
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
        if (!line || line.trim() === '') {
            elements.push(<br key={`br-${index}`} />);
            return;
        }
        if (line.startsWith('#')) {
            const level = line.match(/^#+/)[0].length;
            const text = line.replace(/^#+\s*/, '');
            const HeaderTag = `h${Math.min(level + 2, 6)}`;
            
            // Add special styling for different header levels
            let headerClassName = "mt-4 mb-3";
            if (level === 1) {
                // Main headers (h3) - keep original styling
                headerClassName = "mt-4 mb-3";
            } else if (level === 2) {
                // Sub headers (h4) - pretty purple with accent
                headerClassName = "mt-3 mb-2 text-purple fw-semibold border-start border-3 border-purple ps-3";
            } else if (level === 3) {
                // Sub-sub headers (h5) - classy dark gray with subtle styling
                headerClassName = "mt-2 mb-2 text-dark fw-medium border-bottom border-1 border-light pb-1";
            } else {
                // Other headers (h6) - soft teal
                headerClassName = "mt-2 mb-1 text-info fw-normal";
            }
            
            elements.push(
                React.createElement(HeaderTag, {
                    key: `header-${index}`,
                    className: headerClassName
                }, text)
            );
            return;
        }
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
        
        // Handle Markdown-style links [text](url) and automatic URL detection
        if (line.includes('[') || line.includes('http://') || line.includes('https://')) {
            // First handle Markdown-style links [text](url)
            let processedLine = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
                return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary">${text}</a>`;
            });
            
            // Then handle automatic URL detection for http:// and https://
            processedLine = processedLine.replace(/(https?:\/\/[^\s]+)/g, (match, url) => {
                return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-primary">${url}</a>`;
            });
            
            elements.push(<p key={`p-${index}`} className="mb-2" dangerouslySetInnerHTML={{ __html: processedLine }} />);
            return;
        }
        if (line.match(/^[\s]*[-*]\s/)) {
            const text = line.replace(/^[\s]*[-*]\s/, '');
            elements.push(
                <li key={`li-${index}`} className="mb-1">{text}</li>
            );
            return;
        }
        elements.push(<p key={`p-${index}`} className="mb-2">{line}</p>);
    });
    return elements;
} 

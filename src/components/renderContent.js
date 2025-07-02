import React from 'react';
import ScratchBlocks from 'scratchblocks-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper to parse italics in a string (handles *text* and _text_)
function parseItalics(text) {
    const elements = [];
    let remaining = text;
    let match;
    // Regex for *text* or _text_ (not bold)
    const italicsRegex = /(?<!\*)\*(?!\*)([^*]+)(?<!\*)\*(?!\*)|_(?!_)([^_]+)_(?!_)/g;
    let lastIndex = 0;
    while ((match = italicsRegex.exec(remaining)) !== null) {
        if (match.index > lastIndex) {
            elements.push(remaining.slice(lastIndex, match.index));
        }
        const italicText = match[1] || match[2];
        elements.push(<em key={Math.random()}>{italicText}</em>);
        lastIndex = italicsRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
        elements.push(remaining.slice(lastIndex));
    }
    return elements.length > 0 ? elements : text;
}

// Helper to parse a line and return an array of text and <a> elements for Markdown links and URLs, and handle italics
function parseLinks(line) {
    const elements = [];
    let remaining = line;
    let match;
    // Regex for Markdown link
    const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    // Regex for plain URL
    const urlRegex = /(https?:\/\/[^\s]+)/;
    while (remaining.length > 0) {
        // Find the first match (Markdown or URL)
        const mdMatch = mdLinkRegex.exec(remaining);
        const urlMatch = urlRegex.exec(remaining);
        let nextMatch = null;
        let isMd = false;
        if (mdMatch && urlMatch) {
            // Pick the one that comes first
            if (mdMatch.index < urlMatch.index) {
                nextMatch = mdMatch;
                isMd = true;
            } else {
                nextMatch = urlMatch;
            }
        } else if (mdMatch) {
            nextMatch = mdMatch;
            isMd = true;
        } else if (urlMatch) {
            nextMatch = urlMatch;
        }
        if (!nextMatch) {
            // Handle italics in the remaining text
            elements.push(...[].concat(parseItalics(remaining)));
            break;
        }
        // Text before the match
        if (nextMatch.index > 0) {
            elements.push(...[].concat(parseItalics(remaining.slice(0, nextMatch.index))));
        }
        if (isMd) {
            // Markdown link
            elements.push(
                <a
                    key={Math.random()}
                    href={nextMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                >
                    {nextMatch[1]}
                </a>
            );
            remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
        } else {
            // Plain URL
            elements.push(
                <a
                    key={Math.random()}
                    href={nextMatch[1]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                >
                    {nextMatch[1]}
                </a>
            );
            remaining = remaining.slice(nextMatch.index + nextMatch[0].length);
        }
    }
    return elements;
}

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
        // List item
        if (line.match(/^[\s]*[-*]\s/)) {
            const text = line.replace(/^[\s]*[-*]\s/, '');
            elements.push(
                <li key={`li-${index}`} className="mb-1">{parseLinks(text)}</li>
            );
            return;
        }
        elements.push(<p key={`p-${index}`} className="mb-2">{parseLinks(line)}</p>);
    });
    return elements;
} 

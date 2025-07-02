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

// Helper to parse links and italics, but NOT code (used by parseLinks)
function parseLinksNoCode(text) {
    const elements = [];
    let remaining = text;
    let match;
    const mdLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const urlRegex = /(https?:\/\/[^\s]+)/;
    while (remaining.length > 0) {
        const mdMatch = mdLinkRegex.exec(remaining);
        const urlMatch = urlRegex.exec(remaining);
        let nextMatch = null;
        let isMd = false;
        if (mdMatch && urlMatch) {
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
            elements.push(...[].concat(parseItalics(remaining)));
            break;
        }
        if (nextMatch.index > 0) {
            elements.push(...[].concat(parseItalics(remaining.slice(0, nextMatch.index))));
        }
        if (isMd) {
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

// Helper to parse links and italics, but NOT code (used by parseLinks)
function parseLinks(line) {
    const elements = [];
    let remaining = line;
    let match;
    // Regex for inline code (single backticks, not part of code block)
    const codeRegex = /(?<!`)`([^`]+)`(?!`)/g;
    let lastIndex = 0;
    while ((match = codeRegex.exec(remaining)) !== null) {
        if (match.index > lastIndex) {
            // Text before code: apply link and italics logic
            const beforeText = remaining.slice(lastIndex, match.index);
            elements.push(...[].concat(parseLinksNoCode(beforeText)));
        }
        // Inline code
        elements.push(
            <code key={Math.random()}>{match[1]}</code>
        );
        lastIndex = codeRegex.lastIndex;
    }
    if (lastIndex < remaining.length) {
        // Remaining text after last code: apply link and italics logic
        elements.push(...[].concat(parseLinksNoCode(remaining.slice(lastIndex))));
    }
    return elements;
}

// Helper to parse HTML content safely
function parseHTML(htmlString) {
    // Simple HTML parser for common tags
    const allowedTags = ['b', 'i', 'em', 'strong', 'u', 'br', 'span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const allowedAttributes = ['class', 'style', 'href', 'target', 'rel'];
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Recursively process nodes
    function processNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
        }
        
        if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            
            // Only allow safe tags
            if (!allowedTags.includes(tagName)) {
                return node.textContent;
            }
            
            // Create React element
            const props = {};
            
            // Copy allowed attributes
            for (let attr of allowedAttributes) {
                if (node.hasAttribute(attr)) {
                    props[attr] = node.getAttribute(attr);
                }
            }
            
            // Process children
            const children = [];
            for (let child of node.childNodes) {
                const processedChild = processNode(child);
                if (processedChild !== null) {
                    children.push(processedChild);
                }
            }
            
            return React.createElement(tagName, props, ...children);
        }
        
        return null;
    }
    
    const processedContent = [];
    for (let child of tempDiv.childNodes) {
        const processed = processNode(child);
        if (processed !== null) {
            processedContent.push(processed);
        }
    }
    
    return processedContent.length > 0 ? processedContent : htmlString;
}

export function renderContent(text) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockLines = [];
    let inBlockquote = false;
    let blockquoteLines = [];
    
    lines.forEach((line, index) => {
        if (line.startsWith('```')) {
            // End blockquote if we're in one
            if (inBlockquote) {
                elements.push(
                    <blockquote key={`blockquote-${index}`} className="border-start border-3 border-secondary ps-3 py-2 bg-light">
                        {blockquoteLines.map((quoteLine, quoteIndex) => (
                            <p key={`quote-${index}-${quoteIndex}`} className="mb-1">
                                {parseLinks(quoteLine)}
                            </p>
                        ))}
                    </blockquote>
                );
                blockquoteLines = [];
                inBlockquote = false;
            }
            
            if (!inCodeBlock) {
                inCodeBlock = true;
                const langMatch = line.match(/^```(\w+)/);
                if (langMatch) {
                    codeBlockLang = langMatch[1];
                    codeBlockLines = [];
                } else {
                    // No language specified, treat as blockquote
                    inCodeBlock = false;
                    inBlockquote = true;
                    blockquoteLines = [];
                }
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
                } else if (codeBlockLang === 'html') {
                    elements.push(
                        <SyntaxHighlighter
                            key={`codeblock-${index}`}
                            language="html"
                            style={oneLight}
                            customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
                        >
                            {codeBlockLines.join('\n')}
                        </SyntaxHighlighter>
                    );
                } else if (codeBlockLang === 'python') {
                    elements.push(
                        <SyntaxHighlighter
                            key={`codeblock-${index}`}
                            language="python"
                            style={oneLight}
                            customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
                        >
                            {codeBlockLines.join('\n')}
                        </SyntaxHighlighter>
                    );
                } else if (codeBlockLang === 'javascript') {
                    elements.push(
                        <SyntaxHighlighter
                            key={`codeblock-${index}`}
                            language="javascript"
                            style={oneLight}
                            customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
                        >
                            {codeBlockLines.join('\n')}
                        </SyntaxHighlighter>
                    );
                } else {
                    // Default to python for other languages
                    elements.push(
                        <SyntaxHighlighter
                            key={`codeblock-${index}`}
                            language={codeBlockLang || 'python'}
                            style={oneLight}
                            customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
                        >
                            {codeBlockLines.join('\n')}
                        </SyntaxHighlighter>
                    );
                }
                codeBlockLines = [];
                codeBlockLang = '';
            }
            return;
        }
        
        if (inCodeBlock) {
            codeBlockLines.push(line);
            return;
        }
        
        // Handle blockquotes
        if (line.startsWith('>')) {
            if (!inBlockquote) {
                inBlockquote = true;
                blockquoteLines = [];
            }
            const quoteText = line.replace(/^>\s*/, '');
            blockquoteLines.push(quoteText);
            return;
        } else if (inBlockquote) {
            // End blockquote
            elements.push(
                <blockquote key={`blockquote-${index}`} className="border-start border-3 border-secondary ps-3 py-2 bg-light">
                    {blockquoteLines.map((quoteLine, quoteIndex) => (
                        <p key={`quote-${index}-${quoteIndex}`} className="mb-1">
                            {parseLinks(quoteLine)}
                        </p>
                    ))}
                </blockquote>
            );
            blockquoteLines = [];
            inBlockquote = false;
        }
        
        if (!line || line.trim() === '') {
            elements.push(<br key={`br-${index}`} />);
            return;
        }
        
        // Check if line contains HTML
        if (line.includes('<') && line.includes('>')) {
            try {
                const htmlContent = parseHTML(line);
                elements.push(<div key={`html-${index}`} className="mb-2">{htmlContent}</div>);
                return;
            } catch (error) {
                // If HTML parsing fails, treat as regular text
                console.warn('HTML parsing failed for line:', line, error);
            }
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
    
    // Handle any remaining blockquote
    if (inBlockquote) {
        elements.push(
            <blockquote key={`blockquote-final`} className="border-start border-3 border-secondary ps-3 py-2 bg-light">
                {blockquoteLines.map((quoteLine, quoteIndex) => (
                    <p key={`quote-final-${quoteIndex}`} className="mb-1">
                        {parseLinks(quoteLine)}
                    </p>
                ))}
            </blockquote>
        );
    }
    
    return elements;
} 

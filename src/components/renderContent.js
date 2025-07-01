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
            elements.push(
                React.createElement(HeaderTag, {
                    key: `header-${index}`,
                    className: "mt-4 mb-3"
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

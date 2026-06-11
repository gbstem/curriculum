'use client';

import React, { useEffect, useState } from 'react';
import ScratchBlocks from 'scratchblocks-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Helper to parse italics in a string (handles *text* and _text_)
function parseItalics(text: string): React.ReactNode[] | string {
  const elements: React.ReactNode[] = [];
  const remaining = text;
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
function parseLinksNoCode(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
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
      elements.push(...([] as React.ReactNode[]).concat(parseItalics(remaining)));
      break;
    }
    if (nextMatch.index > 0) {
      elements.push(
        ...([] as React.ReactNode[]).concat(parseItalics(remaining.slice(0, nextMatch.index)))
      );
    }
    if (isMd && nextMatch[2]) {
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
function parseLinks(line: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const remaining = line;
  let match;
  // Regex for inline code (single backticks, not part of code block)
  const codeRegex = /(?<!`)`([^`]+)`(?!`)/g;
  let lastIndex = 0;
  while ((match = codeRegex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      // Text before code: apply link and italics logic
      const beforeText = remaining.slice(lastIndex, match.index);
      elements.push(...([] as React.ReactNode[]).concat(parseLinksNoCode(beforeText)));
    }
    // Inline code
    elements.push(<code key={Math.random()}>{match[1]}</code>);
    lastIndex = codeRegex.lastIndex;
  }
  if (lastIndex < remaining.length) {
    // Remaining text after last code: apply link and italics logic
    elements.push(
      ...([] as React.ReactNode[]).concat(parseLinksNoCode(remaining.slice(lastIndex)))
    );
  }
  return elements;
}

// Helper to parse HTML content safely
function parseHTML(htmlString: string): React.ReactNode[] | string {
  if (typeof window === 'undefined') {
    return htmlString;
  }
  // Simple HTML parser for common tags
  const allowedTags = [
    'b',
    'i',
    'em',
    'strong',
    'u',
    'br',
    'span',
    'div',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
  ];
  const allowedAttributes = ['class', 'style', 'href', 'target', 'rel'];

  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Recursively process nodes
  function processNode(node: Node): React.ReactNode | null {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      // Only allow safe tags
      if (!allowedTags.includes(tagName)) {
        return element.textContent;
      }

      // Create React element
      const props: Record<string, string> = {};

      // Copy allowed attributes
      for (const attr of allowedAttributes) {
        if (element.hasAttribute(attr)) {
          props[attr] = element.getAttribute(attr) || '';
        }
      }

      // Process children
      const children: React.ReactNode[] = [];
      for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];
        const processedChild = processNode(child);
        if (processedChild !== null) {
          children.push(processedChild);
        }
      }

      return React.createElement(tagName, { ...props, key: Math.random() }, ...children);
    }

    return null;
  }

  const processedContent: React.ReactNode[] = [];
  for (let i = 0; i < tempDiv.childNodes.length; i++) {
    const child = tempDiv.childNodes[i];
    const processed = processNode(child);
    if (processed !== null) {
      processedContent.push(processed);
    }
  }

  return processedContent.length > 0 ? processedContent : htmlString;
}

interface ListItem {
  level: number;
  content: React.ReactNode[];
  originalIndex: number;
  children?: ListItem[];
}

function renderContentHelper(text: string): React.ReactNode[] | null {
  if (!text) return null;
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];
  let inBlockquote = false;
  let blockquoteLines: string[] = [];
  let inList = false;
  let listItems: ListItem[] = [];

  // Helper function to process accumulated list items
  function processListItems() {
    if (listItems.length === 0) return null;

    // Create a proper nested structure
    function buildNestedStructure(items: ListItem[]): ListItem[] {
      const result: ListItem[] = [];
      const stack: ListItem[] = []; // Stack to track parent items

      items.forEach((item) => {
        // Pop items from stack that are at same or deeper level
        while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
          stack.pop();
        }

        // Create the list item
        const listItem: ListItem = {
          ...item,
          children: [],
        };

        // Add to parent if there is one
        if (stack.length > 0) {
          stack[stack.length - 1].children?.push(listItem);
        } else {
          result.push(listItem);
        }

        // Push to stack
        stack.push(listItem);
      });

      return result;
    }

    // Convert to React elements
    function createReactElements(items: ListItem[]): React.ReactNode[] {
      return items.map((item, index) => {
        const children =
          item.children && item.children.length > 0 ? createReactElements(item.children) : null;
        return (
          <li key={`li-${item.originalIndex}-${index}`} className="mb-1">
            {item.content}
            {children && (
              <ul key={`ul-${item.originalIndex}`} className="mb-1">
                {children}
              </ul>
            )}
          </li>
        );
      });
    }

    const nestedStructure = buildNestedStructure(listItems);
    const listElement = (
      <ul key={`ul-main-${listItems[0].originalIndex}`} className="mb-2">
        {createReactElements(nestedStructure)}
      </ul>
    );
    listItems = [];
    return listElement;
  }

  lines.forEach((line, index) => {
    if (line.startsWith('```')) {
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }

      // End blockquote if we're in one
      if (inBlockquote) {
        elements.push(
          <blockquote
            key={`blockquote-${index}`}
            className="border-start border-secondary bg-light border-3 py-2 ps-3"
          >
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
            <div key={`scratchblock-${index}`} className="my-4">
              <ScratchBlocks blockStyle="scratch3">{codeBlockLines.join('\n')}</ScratchBlocks>
            </div>
          );
        } else {
          // Normalize HTML/JS/Python etc.
          let lang = codeBlockLang || 'python';
          if (lang === 'html') lang = 'html';

          elements.push(
            <SyntaxHighlighter
              key={`codeblock-${index}`}
              language={lang}
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
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }

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
        <blockquote
          key={`blockquote-${index}`}
          className="border-start border-secondary bg-light border-3 py-2 ps-3"
        >
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
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }
      elements.push(<br key={`br-${index}`} />);
      return;
    }

    // Check if line contains HTML
    if (line.includes('<') && line.includes('>') && !line.includes('`')) {
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }

      try {
        const htmlContent = parseHTML(line);
        elements.push(
          <div key={`html-${index}`} className="mb-2">
            {htmlContent}
          </div>
        );
        return;
      } catch (error) {
        // If HTML parsing fails, treat as regular text
        console.warn('HTML parsing failed for line:', line, error);
      }
    }

    if (line.startsWith('#')) {
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }

      const levelMatch = line.match(/^#+/);
      const level = levelMatch ? levelMatch[0].length : 1;
      const text = line.replace(/^#+\s*/, '');
      const HeaderTag = `h${Math.min(level + 2, 6)}` as any;

      // Add special styling for different header levels
      let headerClassName = 'mt-4 mb-3';
      if (level === 1) {
        headerClassName = 'mt-4 mb-3';
      } else if (level === 2) {
        headerClassName =
          'mt-3 mb-2 text-purple fw-semibold border-start border-3 border-purple ps-3';
      } else if (level === 3) {
        headerClassName = 'mt-2 mb-2 text-dark fw-medium border-bottom border border-light pb-1';
      } else {
        headerClassName = 'mt-2 mb-1 text-info fw-normal';
      }

      elements.push(
        React.createElement(
          HeaderTag,
          {
            key: `header-${index}`,
            className: headerClassName,
          },
          text
        )
      );
      return;
    }

    if (line.includes('**')) {
      // End list if we're in one
      if (inList) {
        const listElement = processListItems();
        if (listElement) {
          elements.push(listElement);
        }
        inList = false;
      }

      const parts = line.split('**');
      const formattedParts = parts.map((part, partIndex) => {
        if (partIndex % 2 === 1) {
          return <strong key={`bold-${index}-${partIndex}`}>{part}</strong>;
        }
        return part;
      });
      elements.push(
        <p key={`p-${index}`} className="mb-2">
          {formattedParts}
        </p>
      );
      return;
    }

    // List item
    if (line.match(/^[\s]*[-*]\s/)) {
      // Calculate indentation level
      const match = line.match(/^(\s*)[-*]\s/);
      let indentLevel = 0;

      if (match) {
        const indent = match[1];
        let spaces = 0;
        let tabs = 0;
        for (let i = 0; i < indent.length; i++) {
          if (indent[i] === '\t') {
            tabs++;
          } else if (indent[i] === ' ') {
            spaces++;
          }
        }
        indentLevel = tabs + Math.floor(spaces / 2);
      }

      const text = line.replace(/^[\s]*[-*]\s/, '');

      // Add to list items
      listItems.push({
        level: indentLevel,
        content: parseLinks(text),
        originalIndex: index,
      });
      inList = true;
      return;
    }

    // End list if we're in one and this is not a list item
    if (inList) {
      const listElement = processListItems();
      if (listElement) {
        elements.push(listElement);
      }
      inList = false;
    }

    elements.push(
      <p key={`p-${index}`} className="mb-2">
        {parseLinks(line)}
      </p>
    );
  });

  // Handle any remaining list
  if (inList) {
    const listElement = processListItems();
    if (listElement) {
      elements.push(listElement);
    }
  }

  // Handle any remaining blockquote
  if (inBlockquote) {
    elements.push(
      <blockquote
        key={`blockquote-final`}
        className="border-start border-secondary bg-light border-3 py-2 ps-3"
      >
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

export function renderContent(text: string): React.ReactNode {
  return <RenderContent content={text} />;
}

export function RenderContent({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4 py-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200"></div>
        <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200"></div>
        <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-200"></div>
      </div>
    );
  }

  return <>{renderContentHelper(content)}</>;
}

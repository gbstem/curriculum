'use client';

import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import ScratchBlocks from 'scratchblocks-react';

// Deliberately *stricter* than an earlier DOMPurify allow-list it replaces.
// `style` and `class` are dropped (zero live content uses either), and the
// default schema's URL-protocol restriction subsumes the old isSafeHref() check.
const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'u'],
};

// Fenced code blocks. Overriding `pre` rather than `code` is deliberate: react-markdown v9
// removed the `inline` prop that older snippets branch on, and matching only on
// `language-*` misclassifies a bare ``` fence as inline code. `pre` fires for fenced
// blocks and nothing else, and reading the hast `node` avoids digging through React
// children.
function CodeBlock({ node }: any) {
  const codeNode = node?.children?.[0];
  const source = (codeNode?.children ?? [])
    .map((c: any) => c.value ?? '')
    .join('')
    .replace(/\n$/, '');

  const rawClass = codeNode?.properties?.className;
  const classNames: string[] = Array.isArray(rawClass)
    ? rawClass
    : typeof rawClass === 'string'
      ? rawClass.split(/\s+/)
      : [];
  const lang = classNames.map((c) => /^language-([\w-]+)$/.exec(c)?.[1]).find(Boolean);

  if (lang === 'scratch' || lang === 'scratchblocks') {
    return (
      <div className="my-6">
        <ScratchBlocks blockStyle="scratch3">{source}</ScratchBlocks>
      </div>
    );
  }

  const language = lang || 'text';
  return (
    <SyntaxHighlighter
      language={language}
      style={oneLight}
      customStyle={{
        borderRadius: '8px',
        borderLeft: '4px solid #67aeda',
        fontSize: '1rem',
        margin: '1rem 0',
      }}
      codeTagProps={{
        className: `language-${language}`,
        style: {
          ...oneLight['code[class*="language-"]'],
          ...oneLight[`code[class*="language-${language}"]`],
          padding: '0.2rem 0.4rem',
          borderRadius: '4px',
          fontSize: '0.9rem',
        },
      }}
    >
      {source}
    </SyntaxHighlighter>
  );
}

/** Text size and spacing for a lesson, on whatever element wraps `RenderContent`. */
export const LESSON_TEXT = 'text-[1.1rem] leading-[1.6] narrow:text-base';

// Demotes headings (h1 -> h3, capped at h6), because the lesson page already renders its own
// <h1>, and styles each level.
function heading(level: number) {
  const Tag = `h${Math.min(level + 2, 6)}` as React.ElementType;
  const className =
    level === 1
      ? 'mt-6 mb-4 border-b-2 border-b-sky pb-2 text-navy'
      : level === 2
        ? // The full box (lighter on the left) began as an accident, but readers are used to
          // it, so it stays.
          'mt-4 mb-2 border-3 border-l-divider ps-4 font-semibold text-[#2c3e50]'
        : level === 3
          ? 'my-2 border border-light pb-1 font-medium text-dark'
          : 'mt-2 mb-1 font-normal text-info';

  const Heading = ({ children }: { children?: React.ReactNode }) => (
    <Tag className={className}>{children}</Tag>
  );
  Heading.displayName = `MarkdownHeading${level}`;
  return Heading;
}

const components = {
  pre: CodeBlock,
  h1: heading(1),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  h5: heading(5),
  h6: heading(6),
  p: ({ children }: any) => <p className="mb-2">{children}</p>,
  ul: ({ children }: any) => <ul className="mb-2 list-disc ps-6">{children}</ul>,
  ol: ({ children }: any) => <ol className="mb-2 list-decimal ps-6">{children}</ol>,
  li: ({ children }: any) => <li className="mb-1">{children}</li>,
  strong: ({ children }: any) => <strong className="font-semibold text-navy">{children}</strong>,
  code: ({ children }: any) => (
    <code className="rounded-[4px] bg-[#f7fafc] px-[0.4rem] py-[0.2rem] font-['Courier_New',monospace] text-[0.9rem] text-[#2d3748]">
      {children}
    </code>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-3 border-secondary bg-light py-2 ps-4">{children}</blockquote>
  ),
  a: ({ href, children }: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary">
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => <img src={src} alt={alt ?? ''} className="my-4 h-auto max-w-full" />,
  table: ({ children }: any) => (
    <div className="my-4 overflow-x-auto">
      <table className="mb-4 w-full border-divider align-top">{children}</table>
    </div>
  ),
  thead: ({ children }: any) => <thead className="align-bottom">{children}</thead>,
  tbody: ({ children }: any) => <tbody className="align-top">{children}</tbody>,
  tr: ({ children }: any) => <tr className="border-y border-divider">{children}</tr>,
  // Spread so a column's alignment (`| :---: |`) still reaches the cell as its `style`.
  th: ({ node: _node, ...props }: any) => (
    <th {...props} className="border-x border-divider bg-white p-1 text-black" />
  ),
  td: ({ node: _node, ...props }: any) => (
    <td {...props} className="border-x border-divider bg-white p-1 text-black" />
  ),
};

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

  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkBreaks]}
      rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
      components={components}
    >
      {content}
    </Markdown>
  );
}

export function renderContent(text: string): React.ReactNode {
  return <RenderContent content={text} />;
}

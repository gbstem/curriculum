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
      <div className="my-4">
        <ScratchBlocks blockStyle="scratch3">{source}</ScratchBlocks>
      </div>
    );
  }

  return (
    <SyntaxHighlighter
      language={lang || 'text'}
      style={oneLight}
      customStyle={{ borderRadius: '8px', fontSize: '1rem', margin: '1rem 0' }}
    >
      {source}
    </SyntaxHighlighter>
  );
}

// Preserves the existing demotion (h1 -> h3, capped at h6) and per-level Bootstrap classes
// from the old renderContentHelper. The demotion matters: the lesson page already renders
// its own <h1>.
function heading(level: number) {
  const Tag = `h${Math.min(level + 2, 6)}` as React.ElementType;
  const className =
    level === 1
      ? 'mt-4 mb-3'
      : level === 2
        ? 'mt-3 mb-2 text-purple fw-semibold border-start border-3 border-purple ps-3'
        : level === 3
          ? 'mt-2 mb-2 text-dark fw-medium border-bottom border border-light pb-1'
          : 'mt-2 mb-1 text-info fw-normal';

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
  ul: ({ children }: any) => <ul className="mb-2 list-disc ps-4">{children}</ul>,
  ol: ({ children }: any) => <ol className="mb-2 list-decimal ps-4">{children}</ol>,
  li: ({ children }: any) => <li className="mb-1">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-start border-secondary bg-light border-3 py-2 ps-3">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary">
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => <img src={src} alt={alt ?? ''} className="img-fluid my-3" />,
  table: ({ children }: any) => (
    <div className="table-responsive my-3">
      <table className="table-bordered table-sm table">{children}</table>
    </div>
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

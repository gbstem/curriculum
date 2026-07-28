import { render, screen } from '@testing-library/react';
import { RenderContent } from '../app/components/renderContent';

// Mock react-syntax-highlighter to simplify rendering in JSDOM
jest.mock('react-syntax-highlighter', () => ({
  Prism: function MockSyntaxHighlighter({ children, language }: any) {
    return (
      <pre data-testid="syntax-highlighter" data-language={language}>
        {children}
      </pre>
    );
  },
}));

// Mock scratchblocks-react to simplify rendering Scratch blocks
jest.mock('scratchblocks-react', () => {
  return function MockScratchBlocks({ children }: any) {
    return <div data-testid="scratch-blocks">{children}</div>;
  };
});

describe('RenderContent component', () => {
  it('renders nothing when content is empty', () => {
    const { container } = render(<RenderContent content="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders headings of different levels with appropriate tags', () => {
    const markdown = '# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4';
    render(<RenderContent content={markdown} />);

    // # level 1 becomes h3 (Math.min(level + 2, 6))
    expect(screen.getByRole('heading', { level: 3, name: 'Heading 1' })).toBeInTheDocument();
    // ## level 2 becomes h4
    expect(screen.getByRole('heading', { level: 4, name: 'Heading 2' })).toBeInTheDocument();
    // ### level 3 becomes h5
    expect(screen.getByRole('heading', { level: 5, name: 'Heading 3' })).toBeInTheDocument();
    // #### level 4 becomes h6
    expect(screen.getByRole('heading', { level: 6, name: 'Heading 4' })).toBeInTheDocument();
  });

  it('renders bold text', () => {
    const markdown = 'This is **bold** text.';
    render(<RenderContent content={markdown} />);

    expect(screen.getByText(/This is/)).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
  });

  it('renders italic text', () => {
    const markdown = 'This is *italic* text and _italic2_ text.';
    render(<RenderContent content={markdown} />);

    expect(screen.getByText(/This is/)).toBeInTheDocument();
    expect(screen.getByText('italic').tagName).toBe('EM');
    expect(screen.getByText('italic2').tagName).toBe('EM');
  });

  it('renders markdown links and raw URLs', () => {
    const markdown = 'Check [Google](https://google.com) or visit https://github.com';
    render(<RenderContent content={markdown} />);

    const link1 = screen.getByRole('link', { name: 'Google' });
    expect(link1).toBeInTheDocument();
    expect(link1).toHaveAttribute('href', 'https://google.com');

    const link2 = screen.getByRole('link', { name: 'https://github.com' });
    expect(link2).toBeInTheDocument();
    expect(link2).toHaveAttribute('href', 'https://github.com');
  });

  it('renders markdown links with mailto: and relative/anchor hrefs', () => {
    const markdown =
      'Email [us](mailto:hello@example.com), see [section](#section), or go [home](/home)';
    render(<RenderContent content={markdown} />);

    expect(screen.getByRole('link', { name: 'us' })).toHaveAttribute(
      'href',
      'mailto:hello@example.com'
    );
    expect(screen.getByRole('link', { name: 'section' })).toHaveAttribute('href', '#section');
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/home');
  });

  it('does not render a clickable link for javascript: or data: markdown link targets', () => {
    const markdown =
      "Click [here](javascript:window.location='http://evil.example') or [this](data:text/plain;base64,eHNz)";
    const { container } = render(<RenderContent content={markdown} />);

    expect(container.querySelector('a[href]')).toBeNull();
    // The display text should still be present, just not as a clickable link
    expect(container.textContent).toContain('here');
    expect(container.textContent).toContain('this');
  });

  it('renders inline code blocks', () => {
    const markdown = 'Use `console.log()` to debug code.';
    render(<RenderContent content={markdown} />);

    const code = screen.getByText('console.log()');
    expect(code.tagName).toBe('CODE');
  });

  it('renders code blocks using syntax highlighter', () => {
    const markdown = '```javascript\nconst x = 5;\nconsole.log(x);\n```';
    render(<RenderContent content={markdown} />);

    const highlighter = screen.getByTestId('syntax-highlighter');
    expect(highlighter).toBeInTheDocument();
    expect(highlighter).toHaveAttribute('data-language', 'javascript');
    expect(highlighter.textContent).toContain('const x = 5');
  });

  it('renders Scratch blocks', () => {
    const markdown = '```scratch\nwhen green flag clicked\nsay [Hello!] for (2) secs\n```';
    render(<RenderContent content={markdown} />);

    const scratch = screen.getByTestId('scratch-blocks');
    expect(scratch).toBeInTheDocument();
    expect(scratch.textContent).toContain('when green flag clicked');
  });

  it('renders blockquotes', () => {
    const markdown = '> This is a quote\n> Second line of quote';
    const { container } = render(<RenderContent content={markdown} />);

    const blockquote = container.querySelector('blockquote');
    expect(blockquote).toBeInTheDocument();
    expect(blockquote).toHaveTextContent('This is a quote');
    expect(blockquote).toHaveTextContent('Second line of quote');
  });

  it('renders nested unordered lists', () => {
    const markdown = '- Item 1\n- Item 2\n  - Subitem 2.1\n  - Subitem 2.2';
    render(<RenderContent content={markdown} />);

    expect(screen.getByText('Item 1').tagName).toBe('LI');
    expect(screen.getByText('Item 2').tagName).toBe('LI');
    expect(screen.getByText('Subitem 2.1').tagName).toBe('LI');
    expect(screen.getByText('Subitem 2.2').tagName).toBe('LI');
  });

  it('parses and renders safe HTML tags', () => {
    const markdown = '<div>Hello <strong>world</strong> in div</div>';
    render(<RenderContent content={markdown} />);

    expect(screen.getByText(/Hello/)).toBeInTheDocument();
    expect(screen.getByText('world').tagName).toBe('STRONG');
  });

  it('strips unsafe HTML tags or handles parsing errors gracefully', () => {
    const markdown = '<script>alert("hack")</script>Hello safe text';
    render(<RenderContent content={markdown} />);

    // The script tag and its contents are sanitized away entirely (not just
    // unwrapped to plain text), since it is never an allowed tag.
    expect(screen.queryByText(/alert\("hack"\)/)).not.toBeInTheDocument();
    expect(screen.getByText(/Hello safe text/)).toBeInTheDocument();
  });

  it('neutralizes event handlers on disallowed elements before parsing (stored XSS)', () => {
    const markdown = '<img src=x onerror=alert(document.cookie)>Hello';
    const { container } = render(<RenderContent content={markdown} />);

    expect(container.innerHTML).not.toContain('onerror');
    expect(container.innerHTML).not.toContain('alert');
    expect(screen.getByText(/Hello/)).toBeInTheDocument();
  });

  it('renders ordered lists correctly', () => {
    const markdown = '1. First item\n2. Second item';
    const { container } = render(<RenderContent content={markdown} />);

    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    const items = container.querySelectorAll('ol > li');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent('First item');
    expect(items[1]).toHaveTextContent('Second item');
  });

  it('renders list item with bold text inside a list item', () => {
    const markdown = '- **Term**: def';
    const { container } = render(<RenderContent content={markdown} />);

    const li = container.querySelector('li');
    expect(li).toBeInTheDocument();
    const strong = li?.querySelector('strong');
    expect(strong).toBeInTheDocument();
    expect(strong).toHaveTextContent('Term');
    expect(li).toHaveTextContent('Term: def');
  });

  it('renders bare code fence as code block rather than empty blockquote', () => {
    const markdown = '```\nprint("hello")\n```';
    const { container } = render(<RenderContent content={markdown} />);

    expect(container.querySelector('blockquote')).toBeNull();
    const highlighter = screen.getByTestId('syntax-highlighter');
    expect(highlighter).toBeInTheDocument();
    expect(highlighter).toHaveAttribute('data-language', 'text');
    expect(highlighter.textContent).toContain('print("hello")');
  });

  it('renders headings with inline code and links', () => {
    const markdown = '## Using `print()` and [docs](https://example.com)';
    render(<RenderContent content={markdown} />);

    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toBeInTheDocument();
    const code = heading.querySelector('code');
    expect(code).toHaveTextContent('print()');
    const link = heading.querySelector('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveTextContent('docs');
  });

  it('renders GFM tables', () => {
    const markdown = '| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |';
    const { container } = render(<RenderContent content={markdown} />);

    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();
    expect(container.querySelector('th')).toHaveTextContent('Header 1');
    expect(container.querySelector('td')).toHaveTextContent('Cell 1');
  });

  it('renders markdown images with alt text', () => {
    const markdown = '![Diagram](https://example.com/diagram.png)';
    const { container } = render(<RenderContent content={markdown} />);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/diagram.png');
    expect(img).toHaveAttribute('alt', 'Diagram');
  });

  it('renders bold with nested italic text inside', () => {
    const markdown = '**bold with *italic* inside**';
    const { container } = render(<RenderContent content={markdown} />);

    const strong = container.querySelector('strong');
    expect(strong).toBeInTheDocument();
    const em = strong?.querySelector('em');
    expect(em).toBeInTheDocument();
    expect(em).toHaveTextContent('italic');
  });

  it('renders two consecutive non-blank lines into a single paragraph with a break (remark-breaks)', () => {
    const markdown = 'Line 1\nLine 2';
    const { container } = render(<RenderContent content={markdown} />);

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(1);
    expect(paragraphs[0].querySelector('br')).toBeInTheDocument();
    expect(paragraphs[0]).toHaveTextContent(/Line 1\s*Line 2/);
  });
});

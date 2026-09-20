import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../app/components/Footer';

describe('<Footer> Component', () => {
  it.each([
    ['Facebook', 'https://facebook.com/The-Greater-Boston-STEM-Program-104063908337961'],
    ['Twitter', 'https://twitter.com/gbstemprogram'],
    ['Instagram', 'https://www.instagram.com/gbstem/'],
    ['LinkedIn', 'https://www.linkedin.com/company/gbstem-program'],
  ])('renders the %s link with its icon inline', (label, href) => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', href);
    expect(link).toHaveAttribute('target', '_blank');

    // The icon is `aria-hidden`, so it's unreachable by any Testing Library
    // role/label query on purpose - direct DOM access is the only option.
    // eslint-disable-next-line testing-library/no-node-access
    const svg = link.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute('width', '35');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg?.children.length).toBeGreaterThan(0);
  });
});

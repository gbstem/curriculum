import { render, screen } from '@testing-library/react';
import React from 'react';
import DiffModal from '../app/components/DiffModal';

// Mock react-diff-viewer to simplify the test and avoid layout/DOM measuring issues in Jest/JSDOM
jest.mock('react-diff-viewer', () => {
  return function MockDiffViewer({ oldValue, newValue }: any) {
    return (
      <div data-testid="diff-viewer">
        <div>Old: {oldValue}</div>
        <div>New: {newValue}</div>
      </div>
    );
  };
});

describe('DiffModal component', () => {
  it('returns null when version is null', () => {
    const { container } = render(
      <DiffModal show={true} onHide={() => {}} currentContent="current content" version={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders and displays diff when version is provided', () => {
    const version = {
      title: 'v1 Title',
      content: 'old version content',
    };

    render(
      <DiffModal
        show={true}
        onHide={() => {}}
        currentContent="new current content"
        version={version}
      />
    );

    expect(screen.getByText('Diff: Current vs. v1 Title')).toBeInTheDocument();
    expect(screen.getByTestId('diff-viewer')).toBeInTheDocument();
    expect(screen.getByText('Old: old version content')).toBeInTheDocument();
    expect(screen.getByText('New: new current content')).toBeInTheDocument();
  });
});

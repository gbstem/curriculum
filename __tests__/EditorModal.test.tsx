import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import EditorModal from '../app/components/EditorModal';
import { deleteCurriculum } from '../app/services/curriculumService';
import { navigateTo } from '@/lib/navigation';

// Mock curriculumService
jest.mock('../app/services/curriculumService', () => ({
  deleteCurriculum: jest.fn(),
}));

// Mock navigation utility
jest.mock('@/lib/navigation', () => ({
  reloadPage: jest.fn(),
  navigateTo: jest.fn(),
}));

// Mock react-syntax-highlighter to simplify rendering and avoid ESM parsing issues in JSDOM
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

// Setup mutable role mock for useSession
let mockRole = 'editor';
jest.mock('@/lib/useSession', () => ({
  useSession: () => ({
    session: { role: mockRole, isLoggedIn: true, username: mockRole },
    loading: false,
    logout: jest.fn(),
    refreshSession: jest.fn(),
  }),
}));

describe('EditorModal component', () => {
  const mockOnSave = jest.fn();
  const mockOnHide = jest.fn();
  const dummyCurriculum = {
    id: 'lesson-1',
    title: 'Lesson 1',
    course: 'scratch1A',
    lessonNumber: 1,
    content: 'Content for lesson 1',
  };

  let confirmSpy: jest.SpyInstance;

  beforeAll(() => {
    // Set the path to simulate editing a lesson on the lesson details page
    window.history.pushState({}, 'Test Page', '/cs/scratch1A/lesson/1');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockRole = 'editor';
    confirmSpy = jest.spyOn(window, 'confirm').mockImplementation(() => true);
  });

  afterEach(() => {
    confirmSpy.mockRestore();
  });

  it('renders nothing when show is false', () => {
    render(
      <EditorModal
        show={false}
        onHide={mockOnHide}
        curriculumData={dummyCurriculum}
        onSave={mockOnSave}
      />
    );
    expect(screen.queryByText('Curriculum Editor')).not.toBeInTheDocument();
  });

  it('renders Editor UI when show is true and user is editor', () => {
    render(
      <EditorModal
        show={true}
        onHide={mockOnHide}
        curriculumData={dummyCurriculum}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText('Curriculum Editor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Lesson title')).toHaveValue('Lesson 1');
    expect(screen.getByPlaceholderText('Enter lesson content in Markdown format...')).toHaveValue(
      'Content for lesson 1'
    );
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
  });

  it('renders Access Denied UI when show is true but user is viewer', () => {
    mockRole = 'viewer';

    render(
      <EditorModal
        show={true}
        onHide={mockOnHide}
        curriculumData={dummyCurriculum}
        onSave={mockOnSave}
      />
    );

    expect(screen.queryByText('Curriculum Editor')).not.toBeInTheDocument();
    expect(screen.getByText('Curriculum Editor Access')).toBeInTheDocument();
    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText('You need to login as an editor to make edits.')).toBeInTheDocument();
  });

  it('asks for confirmation when Delete is clicked and proceeds if confirmed', async () => {
    confirmSpy.mockReturnValueOnce(true);
    (deleteCurriculum as jest.Mock).mockResolvedValueOnce(undefined);

    render(
      <EditorModal
        show={true}
        onHide={mockOnHide}
        curriculumData={dummyCurriculum}
        onSave={mockOnSave}
      />
    );

    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    await act(async () => {
      fireEvent.click(deleteBtn);
    });

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this lesson? This cannot be undone.'
    );
    expect(deleteCurriculum).toHaveBeenCalledWith('lesson-1');
    expect(mockOnHide).toHaveBeenCalled();
    expect(navigateTo).toHaveBeenCalledWith('/cs/scratch1A');
  });

  it('asks for confirmation when Delete is clicked and stops if cancelled', async () => {
    confirmSpy.mockReturnValueOnce(false);

    render(
      <EditorModal
        show={true}
        onHide={mockOnHide}
        curriculumData={dummyCurriculum}
        onSave={mockOnSave}
      />
    );

    const deleteBtn = screen.getByRole('button', { name: /Delete/i });
    await act(async () => {
      fireEvent.click(deleteBtn);
    });

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this lesson? This cannot be undone.'
    );
    expect(deleteCurriculum).not.toHaveBeenCalled();
    expect(mockOnHide).not.toHaveBeenCalled();
    expect(navigateTo).not.toHaveBeenCalled();
  });
});

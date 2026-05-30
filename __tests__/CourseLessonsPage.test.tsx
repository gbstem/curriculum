import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import CourseLessonsPage from '../app/[track]/[course]/page';
import { getCurriculumByCourse, saveCurriculum } from '../app/services/curriculumService';

// Mock the router params
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    use: (_promise: any) => {
      // In tests, we resolve our promise mock sync/async
      return { track: 'cs', course: 'scratch1A' };
    },
  };
});

// Mock curriculumService functions
jest.mock('../app/services/curriculumService', () => ({
  getCurriculumByCourse: jest.fn(),
  saveCurriculum: jest.fn(),
}));

// Mock EditorModal component to avoid complexity in this test
jest.mock('../app/components/EditorModal', () => {
  return function MockEditorModal({ show, onHide, onSave }: any) {
    if (!show) return null;
    return (
      <div data-testid="editor-modal">
        <button onClick={onHide}>Close</button>
        <button onClick={() => onSave({ course: 'scratch1A', lessonNumber: 1, title: 'New' })}>
          Save
        </button>
      </div>
    );
  };
});

// Simple Error Boundary for testing throwing components
class TestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div data-testid="error-boundary">
          <h1>Error Caught</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

describe('CourseLessonsPage component', () => {
  const dummyLessons = [
    {
      id: '1',
      course: 'scratch1A',
      lessonNumber: 1,
      title: 'Intro to Scratch',
      moduleTitle: 'Intro',
      content: '...',
    },
    {
      id: '2',
      course: 'scratch1A',
      lessonNumber: 2,
      title: 'Scratch Motion',
      moduleTitle: 'Intro',
      content: '...',
    },
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading spinner initially', async () => {
    (getCurriculumByCourse as jest.Mock).mockReturnValue(new Promise(() => {})); // Never resolves
    const params = Promise.resolve({ track: 'cs', course: 'scratch1A' });
    render(<CourseLessonsPage params={params} />);

    expect(screen.getByText('Loading lessons list...')).toBeInTheDocument();
  });

  it('renders loaded lessons correctly', async () => {
    (getCurriculumByCourse as jest.Mock).mockResolvedValue(dummyLessons);
    const params = Promise.resolve({ track: 'cs', course: 'scratch1A' });
    render(<CourseLessonsPage params={params} />);

    // Wait for loading to finish and lessons to show
    expect(await screen.findByText('Lesson 1: Intro to Scratch')).toBeInTheDocument();
    expect(screen.getByText('Lesson 2: Scratch Motion')).toBeInTheDocument();
    expect(screen.getByText('Scratch 1A Curriculum')).toBeInTheDocument();
  });

  it('shows empty state when no lessons are found', async () => {
    (getCurriculumByCourse as jest.Mock).mockResolvedValue([]);
    const params = Promise.resolve({ track: 'cs', course: 'scratch1A' });
    render(<CourseLessonsPage params={params} />);

    expect(await screen.findByText('No lessons found for Scratch 1A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add First Lesson' })).toBeInTheDocument();
  });

  it('opens editor modal when Add New Lesson is clicked and saves', async () => {
    (getCurriculumByCourse as jest.Mock).mockResolvedValue(dummyLessons);
    const params = Promise.resolve({ track: 'cs', course: 'scratch1A' });
    render(<CourseLessonsPage params={params} />);

    // Wait for load
    await screen.findByText('Lesson 1: Intro to Scratch');

    const addBtn = screen.getByRole('button', { name: 'Add New Lesson' });
    fireEvent.click(addBtn);

    // Modal should render
    expect(screen.getByTestId('editor-modal')).toBeInTheDocument();

    // Click save in mocked modal
    (saveCurriculum as jest.Mock).mockResolvedValueOnce('new-doc-id');
    const saveBtn = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(saveCurriculum).toHaveBeenCalled();
      expect(getCurriculumByCourse).toHaveBeenCalledTimes(2); // Initial + Reload
    });
  });

  it('renders error alert when loading fails', async () => {
    (getCurriculumByCourse as jest.Mock).mockRejectedValueOnce(
      new Error('Firestore network error')
    );
    const params = Promise.resolve({ track: 'cs', course: 'scratch1A' });

    render(
      <TestErrorBoundary>
        <CourseLessonsPage params={params} />
      </TestErrorBoundary>
    );

    expect(await screen.findByTestId('error-boundary')).toBeInTheDocument();
    expect(screen.getByText('Firestore network error')).toBeInTheDocument();
  });
});

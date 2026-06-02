import { render, screen } from '@testing-library/react';
import VersionHistoryModal from '../app/components/VersionHistoryModal';
import { getVersionHistory } from '../app/services/curriculumService';

// Mock the services and actions
jest.mock('../app/services/curriculumService', () => ({
  getVersionHistory: jest.fn(),
  restoreVersion: jest.fn(),
}));

jest.mock('../app/actions', () => ({}));

describe('VersionHistoryModal component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('does not render when show is false', () => {
    render(
      <VersionHistoryModal show={false} onHide={() => {}} course="scratch1A" lessonNumber={0} />
    );
    expect(screen.queryByText('Version History')).not.toBeInTheDocument();
  });

  it('renders and loads version history for lesson 0 when show is true', async () => {
    const mockVersions = [
      {
        id: 'v2',
        course: 'scratch1A',
        lessonNumber: 0,
        title: 'Introduction to Scratch v2',
        moduleTitle: 'Intro',
        content: 'Content v2',
        versionTimestamp: new Date('2026-05-30T10:00:00Z'),
        versionNumber: 2,
      },
      {
        id: 'v1',
        course: 'scratch1A',
        lessonNumber: 0,
        title: 'Introduction to Scratch v1',
        moduleTitle: 'Intro',
        content: 'Content v1',
        versionTimestamp: new Date('2026-05-30T09:00:00Z'),
        versionNumber: 1,
      },
    ];
    (getVersionHistory as jest.Mock).mockResolvedValueOnce(mockVersions);

    render(
      <VersionHistoryModal show={true} onHide={() => {}} course="scratch1A" lessonNumber={0} />
    );

    // Header title check
    expect(screen.getByText('Version History')).toBeInTheDocument();
    expect(screen.getByText('Course: scratch1A')).toBeInTheDocument();
    expect(screen.getByText('Lesson: 0')).toBeInTheDocument();

    // Wait for the version history to load and render
    expect(await screen.findByText('Introduction to Scratch v2')).toBeInTheDocument();
    expect(await screen.findByText('Introduction to Scratch v1')).toBeInTheDocument();
    expect(getVersionHistory).toHaveBeenCalledWith('scratch1A', 0);
  });

  it('renders and displays empty state message when no history is found', async () => {
    (getVersionHistory as jest.Mock).mockResolvedValueOnce([]);

    render(
      <VersionHistoryModal show={true} onHide={() => {}} course="scratch1A" lessonNumber={0} />
    );

    expect(
      await screen.findByText('No version history found for this lesson.')
    ).toBeInTheDocument();
    expect(getVersionHistory).toHaveBeenCalledWith('scratch1A', 0);
  });

  it('renders and displays error message when service throws an error', async () => {
    (getVersionHistory as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <VersionHistoryModal show={true} onHide={() => {}} course="scratch1A" lessonNumber={0} />
    );

    expect(
      await screen.findByText('Error loading version history: Fetch failed')
    ).toBeInTheDocument();
  });
});

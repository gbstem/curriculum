import { getCourseToTrackMap, runBulkEdit } from '../scripts/bulk-edit';

describe('bulk-edit.ts script', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  test('getCourseToTrackMap maps course IDs to track IDs', () => {
    const map = getCourseToTrackMap();
    expect(map.get('scratch1A')).toBe('cs');
    expect(map.get('python1A')).toBe('cs');
    expect(map.get('math1A')).toBe('math');
    expect(map.get('physicsA')).toBe('science');
    expect(map.get('engineering1A')).toBe('engineering');
    expect(map.has('orphaned_course_x')).toBe(false);
  });

  test('filters out orphaned lessons and calls editFn for valid track lessons', async () => {
    const fakeAdd = jest.fn().mockResolvedValue({ id: 'v123' });
    const fakeUpdate = jest.fn().mockResolvedValue(undefined);
    const fakeDoc = jest.fn(() => ({ update: fakeUpdate }));

    const mockDocs = [
      {
        id: 'doc1',
        data: () => ({
          course: 'scratch1A',
          lessonNumber: 1,
          title: 'Scratch Intro',
          content: 'Original content 1',
        }),
      },
      {
        id: 'doc2',
        data: () => ({
          course: 'orphaned_course_xyz',
          lessonNumber: 5,
          title: 'Orphaned Lesson',
          content: 'Orphaned content',
        }),
      },
      {
        id: 'doc3',
        data: () => ({
          course: 'math1A',
          lessonNumber: 2,
          title: 'Math Intro',
          content: 'Original content 3',
        }),
      },
    ];

    const mockDb: any = {
      collection: jest.fn((colName: string) => {
        if (colName === 'curriculum') {
          return {
            get: jest.fn().mockResolvedValue(mockDocs),
            doc: fakeDoc,
          };
        }
        if (colName === 'curriculum_versions') {
          return {
            add: fakeAdd,
          };
        }
        return {};
      }),
    };

    const editFn = jest.fn<string | null, [string, string, number, string]>(
      (trackId, courseId, _lessonNumber, content) => {
        if (courseId === 'scratch1A') {
          return content + ' [updated]';
        }
        return null;
      }
    );

    const result = await runBulkEdit({
      editFn,
      dryRun: true,
      db: mockDb,
    });

    expect(result.totalDocs).toBe(3);
    expect(result.validDocs).toBe(2);
    expect(result.filteredDocs).toBe(1);
    expect(result.changedDocs).toBe(1);
    expect(result.writtenDocs).toBe(0);

    // Verify editFn arguments for scratch1A
    expect(editFn).toHaveBeenCalledWith('cs', 'scratch1A', 1, 'Original content 1');
    // Verify editFn arguments for math1A
    expect(editFn).toHaveBeenCalledWith('math', 'math1A', 2, 'Original content 3');
    // Verify editFn was NOT called for orphaned_course_xyz
    expect(editFn).not.toHaveBeenCalledWith(
      expect.anything(),
      'orphaned_course_xyz',
      expect.anything(),
      expect.anything()
    );

    // Dry run should NOT call add or update
    expect(fakeAdd).not.toHaveBeenCalled();
    expect(fakeUpdate).not.toHaveBeenCalled();
  });

  test('performs Firestore writes when dryRun is false', async () => {
    const fakeAdd = jest.fn().mockResolvedValue({ id: 'v123' });
    const fakeUpdate = jest.fn().mockResolvedValue(undefined);
    const fakeDoc = jest.fn(() => ({ update: fakeUpdate }));

    const mockDocs = [
      {
        id: 'doc1',
        data: () => ({
          course: 'python1A',
          lessonNumber: 3,
          title: 'Python Lesson',
          moduleTitle: 'Basics',
          content: 'Old python code',
        }),
      },
    ];

    const mockDb: any = {
      collection: jest.fn((colName: string) => {
        if (colName === 'curriculum') {
          return {
            get: jest.fn().mockResolvedValue(mockDocs),
            doc: fakeDoc,
          };
        }
        if (colName === 'curriculum_versions') {
          return {
            add: fakeAdd,
          };
        }
        return {};
      }),
    };

    const editFn = jest.fn().mockReturnValue('New python code');

    const result = await runBulkEdit({
      editFn,
      dryRun: false,
      db: mockDb,
    });

    expect(result.changedDocs).toBe(1);
    expect(result.writtenDocs).toBe(1);

    // Verify version record added
    expect(fakeAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        course: 'python1A',
        lessonNumber: 3,
        title: 'Python Lesson',
        moduleTitle: 'Basics',
        content: 'New python code',
      })
    );

    // Verify curriculum doc updated
    expect(fakeDoc).toHaveBeenCalledWith('doc1');
    expect(fakeUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'New python code',
      })
    );
  });

  test('skips Firestore writes when dryRun is true', async () => {
    const fakeAdd = jest.fn().mockResolvedValue({ id: 'v123' });
    const fakeUpdate = jest.fn().mockResolvedValue(undefined);
    const fakeDoc = jest.fn(() => ({ update: fakeUpdate }));

    const mockDocs = [
      {
        id: 'doc1',
        data: () => ({
          course: 'python1A',
          lessonNumber: 1,
          title: 'Python Basics',
          content: 'Original python content',
        }),
      },
    ];

    const mockDb: any = {
      collection: jest.fn((colName: string) => {
        if (colName === 'curriculum') {
          return {
            get: jest.fn().mockResolvedValue(mockDocs),
            doc: fakeDoc,
          };
        }
        if (colName === 'curriculum_versions') {
          return {
            add: fakeAdd,
          };
        }
        return {};
      }),
    };

    const editFn = jest.fn().mockReturnValue('Updated python content');

    const result = await runBulkEdit({
      editFn,
      dryRun: true,
      db: mockDb,
    });

    expect(result.changedDocs).toBe(1);
    expect(result.writtenDocs).toBe(0);
    expect(fakeAdd).not.toHaveBeenCalled();
    expect(fakeUpdate).not.toHaveBeenCalled();
  });
});

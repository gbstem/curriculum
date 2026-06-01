// 1. Set up global mock objects before importing actions to ensure they are defined
const mockCookieStoreMap = new Map<string, { value: string }>();

const mockCookieStore: any = {
  get: jest.fn(),
  set: jest.fn(),
  delete: jest.fn(),
  clear: () => mockCookieStoreMap.clear(),
};

// Set on global using the correct keys expected by the mock below
(global as any).mockCookieStore = mockCookieStore;
(global as any).mockCookieStoreMap = mockCookieStoreMap;

// 2. Mock next/headers directly in this test file
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

// Mock iron-session to bypass ESM issues and mock session retrieval
jest.mock('iron-session', () => ({
  getIronSession: jest.fn(async () => {
    const hasEditorPassword = mockCookieStoreMap.get('editor_password')?.value === 'editor-pass';
    return {
      isLoggedIn: hasEditorPassword,
      role: hasEditorPassword ? 'editor' : 'viewer',
      save: jest.fn(),
      destroy: jest.fn(),
    };
  }),
}));

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import {
  deleteCurriculumAction,
  getAllCurriculumAction,
  getCurriculumByCourseAction,
  getCurriculumByCourseAndLessonAction,
  getVersionHistoryAction,
  restoreVersionAction,
  saveCurriculumAction,
} from '../app/actions';
import { mockCollection } from '../jest.setup';

describe('actions.ts server actions', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();

    // Restore mock implementations after resetAllMocks wipes them
    mockCookieStore.get.mockImplementation((key: string) => mockCookieStoreMap.get(key));
    mockCookieStore.set.mockImplementation((key: string, value: string, _options?: any) => {
      mockCookieStoreMap.set(key, { value });
      return mockCookieStore;
    });
    mockCookieStore.delete.mockImplementation((key: string) => {
      mockCookieStoreMap.delete(key);
      return mockCookieStore;
    });

    (cookies as jest.Mock).mockImplementation(() => {
      return Promise.resolve((global as any).mockCookieStore);
    });

    (getIronSession as jest.Mock).mockImplementation(async () => {
      const hasEditorPassword = mockCookieStoreMap.get('editor_password')?.value === 'editor-pass';
      const hasAccessPassword = mockCookieStoreMap.get('access_password')?.value === 'access-pass';
      const isLoggedIn =
        hasEditorPassword ||
        hasAccessPassword ||
        (!mockCookieStoreMap.has('editor_password') && !mockCookieStoreMap.has('access_password'));
      return {
        isLoggedIn: isLoggedIn,
        role: hasEditorPassword ? 'editor' : 'viewer',
        save: jest.fn(),
        destroy: jest.fn(),
      };
    });

    mockCookieStoreMap.clear();
    process.env = { ...originalEnv };
    process.env.NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD = 'access-pass';
    process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD = 'editor-pass';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('authenticated database actions', () => {
    const dummyCurriculum = {
      course: 'python1A',
      lessonNumber: 1,
      title: 'Intro to Python',
      moduleTitle: 'Getting Started',
      content: '# Hello Python',
    };

    describe('when unauthorized', () => {
      beforeEach(() => {
        // Ensure editor cookie is empty or incorrect
        mockCookieStoreMap.set('editor_password', { value: 'wrong-or-missing' });
      });

      it('saveCurriculumAction throws Unauthorized error', async () => {
        await expect(saveCurriculumAction(dummyCurriculum)).rejects.toThrow('Unauthorized');
      });

      it('restoreVersionAction throws Unauthorized error', async () => {
        await expect(restoreVersionAction('version-id', 'original-id')).rejects.toThrow(
          'Unauthorized'
        );
      });

      it('deleteCurriculumAction throws Unauthorized error', async () => {
        await expect(deleteCurriculumAction('doc-id')).rejects.toThrow('Unauthorized');
      });

      it('getAllCurriculumAction throws Unauthorized error', async () => {
        await expect(getAllCurriculumAction()).rejects.toThrow('Unauthorized');
      });

      it('getCurriculumByCourseAction throws Unauthorized error', async () => {
        await expect(getCurriculumByCourseAction('python1A')).rejects.toThrow('Unauthorized');
      });

      it('getCurriculumByCourseAndLessonAction throws Unauthorized error', async () => {
        await expect(getCurriculumByCourseAndLessonAction('python1A', 1)).rejects.toThrow(
          'Unauthorized'
        );
      });

      it('getVersionHistoryAction throws Unauthorized error', async () => {
        await expect(getVersionHistoryAction('python1A', 1)).rejects.toThrow('Unauthorized');
      });
    });

    describe('when authorized', () => {
      beforeEach(() => {
        // Set correct editor cookie
        mockCookieStoreMap.set('editor_password', { value: 'editor-pass' });
      });

      it('saveCurriculumAction creates a new document when no id is provided', async () => {
        const mockAdd = jest.fn(() => Promise.resolve({ id: 'new-doc-id' }));
        mockCollection.mockReturnValue({ add: mockAdd });

        const result = await saveCurriculumAction(dummyCurriculum);
        expect(result).toBe('new-doc-id');
        // Collection 'curriculum' and 'curriculum_versions' should be called
        expect(mockCollection).toHaveBeenCalledWith('curriculum_versions');
        expect(mockCollection).toHaveBeenCalledWith('curriculum');
        expect(mockAdd).toHaveBeenCalled();
      });

      it('saveCurriculumAction updates an existing document when id is provided', async () => {
        const mockUpdate = jest.fn(() => Promise.resolve());
        const mockDoc = jest.fn(() => ({ update: mockUpdate }));
        const mockAdd = jest.fn(() => Promise.resolve({ id: 'version-doc-id' }));
        mockCollection.mockImplementation((collectionName) => {
          if (collectionName === 'curriculum') {
            return { doc: mockDoc };
          }
          return { add: mockAdd };
        });

        const result = await saveCurriculumAction({ ...dummyCurriculum, id: 'existing-id' });
        expect(result).toBe('existing-id');
        expect(mockDoc).toHaveBeenCalledWith('existing-id');
        expect(mockUpdate).toHaveBeenCalled();
      });

      it('saveCurriculumAction parses string lessonNumber and handles empty/falsy fields', async () => {
        const mockAdd = jest.fn(() => Promise.resolve({ id: 'new-doc-id' }));
        mockCollection.mockReturnValue({ add: mockAdd });

        const result = await saveCurriculumAction({
          course: 'python1A',
          lessonNumber: '5' as any,
          title: '',
          moduleTitle: '',
          content: '',
        });
        expect(result).toBe('new-doc-id');
        expect(mockAdd).toHaveBeenCalledWith(
          expect.objectContaining({
            lessonNumber: 5,
            title: '',
            moduleTitle: '',
            content: '',
          })
        );
      });

      it('deleteCurriculumAction deletes the document', async () => {
        const mockDelete = jest.fn(() => Promise.resolve());
        const mockDoc = jest.fn(() => ({ delete: mockDelete }));
        mockCollection.mockReturnValue({ doc: mockDoc });

        await deleteCurriculumAction('doc-id-to-delete');
        expect(mockDoc).toHaveBeenCalledWith('doc-id-to-delete');
        expect(mockDelete).toHaveBeenCalled();
      });

      it('restoreVersionAction fetches the version and calls saveCurriculumAction', async () => {
        const mockGet = jest.fn(() =>
          Promise.resolve({
            exists: true,
            data: () => ({
              ...dummyCurriculum,
              versionTimestamp: 'timestamp',
              versionNumber: 12345,
            }),
          })
        );
        const mockDoc = jest.fn(() => ({ get: mockGet }));
        const mockAdd = jest.fn(() => Promise.resolve({ id: 'restored-id' }));

        const mockUpdate = jest.fn(() => Promise.resolve());
        const mockDocCurriculum = jest.fn(() => ({ update: mockUpdate }));

        mockCollection.mockImplementation((collectionName) => {
          if (collectionName === 'curriculum_versions') {
            return { doc: mockDoc, add: mockAdd };
          }
          return { doc: mockDocCurriculum, add: mockAdd };
        });

        const result = await restoreVersionAction('version-id-123', 'original-id-456');
        expect(result).toBe('original-id-456');
        expect(mockDoc).toHaveBeenCalledWith('version-id-123');
        expect(mockGet).toHaveBeenCalled();
      });

      it('restoreVersionAction throws an error if version does not exist', async () => {
        const mockGet = jest.fn(() =>
          Promise.resolve({
            exists: false,
          })
        );
        const mockDoc = jest.fn(() => ({ get: mockGet }));
        mockCollection.mockReturnValue({ doc: mockDoc });

        await expect(restoreVersionAction('non-existent-id', 'original-id')).rejects.toThrow(
          'Version not found'
        );
      });

      it('saveCurriculumAction handles firestore errors', async () => {
        mockCollection.mockImplementation(() => {
          throw new Error('Database down');
        });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        await expect(saveCurriculumAction(dummyCurriculum)).rejects.toThrow('Database down');
        errorSpy.mockRestore();
      });

      it('deleteCurriculumAction handles firestore errors', async () => {
        mockCollection.mockImplementation(() => {
          throw new Error('Delete failed');
        });
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        await expect(deleteCurriculumAction('doc-id')).rejects.toThrow('Delete failed');
        errorSpy.mockRestore();
      });
    });
  });

  describe('getAllCurriculumAction', () => {
    it('returns curriculum list with serialized timestamps', async () => {
      const mockDocs = [
        {
          id: 'doc1',
          data: () => ({
            course: 'scratch1A',
            lessonNumber: 2,
            title: 'Lesson 2',
            moduleTitle: 'Module 1',
            content: 'Content 2',
            createdAt: { toDate: () => new Date(1600000000000) },
            lastModified: { seconds: 1700000000, nanoseconds: 123 },
          }),
        },
        {
          id: 'doc2',
          data: () => ({
            course: 'scratch1A',
            lessonNumber: 3,
            title: 'Lesson 3',
            moduleTitle: 'Module 1',
            content: 'Content 3',
            createdAt: '2026-05-30',
            lastModified: { invalidTimestamp: true },
          }),
        },
        {
          id: 'doc3',
          data: () => ({
            course: 'scratch1A',
            lessonNumber: 4,
            title: 'Lesson 4',
            moduleTitle: 'Module 2',
            content: 'Content 4',
            createdAt: { seconds: 1600000000 },
            lastModified: null,
          }),
        },
      ];
      const mockGet = jest.fn(() =>
        Promise.resolve({ forEach: (cb: any) => mockDocs.forEach(cb) })
      );
      mockCollection.mockReturnValue({ get: mockGet });

      const result = await getAllCurriculumAction();
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('doc1');
      expect(result[0].createdAt).toEqual({ seconds: 1600000000, nanoseconds: 0 });
      expect(result[0].lastModified).toEqual({ seconds: 1700000000, nanoseconds: 123 });
      expect(result[1].createdAt).toBe('2026-05-30');
      expect(result[1].lastModified).toBeNull();
      expect(result[2].id).toBe('doc3');
      expect(result[2].createdAt).toEqual({ seconds: 1600000000, nanoseconds: 0 });
      expect(mockCollection).toHaveBeenCalledWith('curriculum');
    });

    it('throws error when collection get fails', async () => {
      mockCollection.mockReturnValue({
        get: jest.fn(() => Promise.reject({ toString: () => 'Fetch failed' })),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(getAllCurriculumAction()).rejects.toThrow('Failed to get all curriculum');
      errorSpy.mockRestore();
    });
  });

  describe('getCurriculumByCourseAction', () => {
    it('returns filtered curriculum', async () => {
      const mockDocs = [
        {
          id: 'doc1',
          data: () => ({
            course: 'python1',
            lessonNumber: 1,
            title: 'Lesson 1',
            moduleTitle: 'M',
            content: 'C',
            createdAt: null,
            lastModified: null,
          }),
        },
      ];
      const mockGet = jest.fn(() =>
        Promise.resolve({ forEach: (cb: any) => mockDocs.forEach(cb) })
      );
      const mockWhere = jest.fn(() => ({ get: mockGet }));
      mockCollection.mockReturnValue({ where: mockWhere });

      const result = await getCurriculumByCourseAction('python1');
      expect(result).toHaveLength(1);
      expect(mockWhere).toHaveBeenCalledWith('course', '==', 'python1');
    });

    it('throws error when querying fails', async () => {
      mockCollection.mockReturnValue({
        where: jest.fn(() => ({
          get: jest.fn(() => Promise.reject(new Error('Query failed'))),
        })),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(getCurriculumByCourseAction('python1')).rejects.toThrow(
        'Failed to get curriculum for course'
      );
      errorSpy.mockRestore();
    });
  });

  describe('getCurriculumByCourseAndLessonAction', () => {
    it('returns single curriculum item when found', async () => {
      const mockDocs = [
        {
          id: 'doc1',
          data: () => ({
            course: 'python1',
            lessonNumber: 1,
            title: 'Lesson 1',
            moduleTitle: 'M',
            content: 'C',
            createdAt: null,
            lastModified: null,
          }),
        },
      ];
      const mockGet = jest.fn(() => Promise.resolve({ empty: false, docs: mockDocs }));
      const mockWhere2 = jest.fn(() => ({ get: mockGet }));
      const mockWhere1 = jest.fn(() => ({ where: mockWhere2 }));
      mockCollection.mockReturnValue({ where: mockWhere1 });

      const result = await getCurriculumByCourseAndLessonAction('python1', 1);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('doc1');
      expect(mockWhere1).toHaveBeenCalledWith('course', '==', 'python1');
      expect(mockWhere2).toHaveBeenCalledWith('lessonNumber', '==', 1);
    });

    it('returns null when not found', async () => {
      const mockGet = jest.fn(() => Promise.resolve({ empty: true }));
      const mockWhere2 = jest.fn(() => ({ get: mockGet }));
      const mockWhere1 = jest.fn(() => ({ where: mockWhere2 }));
      mockCollection.mockReturnValue({ where: mockWhere1 });

      const result = await getCurriculumByCourseAndLessonAction('python1', 1);
      expect(result).toBeNull();
    });

    it('throws error when query fails', async () => {
      mockCollection.mockReturnValue({
        where: jest.fn(() => ({
          where: jest.fn(() => ({
            get: jest.fn(() => Promise.reject(new Error('Database error'))),
          })),
        })),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(getCurriculumByCourseAndLessonAction('python1', 1)).rejects.toThrow(
        'Failed to get lesson details'
      );
      errorSpy.mockRestore();
    });
  });

  describe('getVersionHistoryAction', () => {
    it('returns version history list', async () => {
      const mockDocs = [
        {
          id: 'v1',
          data: () => ({
            course: 'python1',
            lessonNumber: 1,
            title: 'Title',
            moduleTitle: 'M',
            content: 'C',
            versionTimestamp: null,
            versionNumber: 12345,
          }),
        },
      ];
      const mockGet = jest.fn(() =>
        Promise.resolve({ forEach: (cb: any) => mockDocs.forEach(cb) })
      );
      const mockWhere2 = jest.fn(() => ({ get: mockGet }));
      const mockWhere1 = jest.fn(() => ({ where: mockWhere2 }));
      mockCollection.mockReturnValue({ where: mockWhere1 });

      const result = await getVersionHistoryAction('python1', 1);
      expect(result).toHaveLength(1);
      expect(result[0].versionNumber).toBe(12345);
      expect(mockCollection).toHaveBeenCalledWith('curriculum_versions');
    });

    it('throws error when query fails', async () => {
      mockCollection.mockReturnValue({
        where: jest.fn(() => ({
          where: jest.fn(() => ({
            get: jest.fn(() => Promise.reject(new Error('Version fetch failed'))),
          })),
        })),
      });
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(getVersionHistoryAction('python1', 1)).rejects.toThrow(
        'Failed to get version history'
      );
      errorSpy.mockRestore();
    });
  });

  describe('withTimeout helper timeout behavior', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('rejects with timeout error when promise takes too long', async () => {
      // Create a promise that does not resolve
      const pendingPromise = new Promise(() => {});
      mockCollection.mockReturnValue({
        get: jest.fn(() => pendingPromise),
      });

      const actionPromise = getAllCurriculumAction();

      // Flush microtasks to allow checkViewerAuth async call to resolve and schedule withTimeout timer
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();

      // Fast forward time by 11 seconds (timeout is 10s)
      jest.advanceTimersByTime(11000);

      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      await expect(actionPromise).rejects.toThrow(
        'Database operation timed out (getting all curriculum items)'
      );
      errorSpy.mockRestore();
    });
  });
});

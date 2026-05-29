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

import {
  verifyAccessPassword,
  verifyEditorPassword,
  saveCurriculumAction,
  restoreVersionAction,
  deleteCurriculumAction,
} from '../app/actions';
import { cookies } from 'next/headers';
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

    mockCookieStoreMap.clear();
    process.env = { ...originalEnv };
    process.env.NEXT_CURRICULUM_ACCESS_PASSWORD = 'access-pass';
    process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD = 'editor-pass';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('verifyAccessPassword', () => {
    it('returns true and sets cookie when password is correct', async () => {
      const result = await verifyAccessPassword('access-pass');
      expect(result).toBe(true);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'access_password',
        'access-pass',
        expect.any(Object)
      );
      expect(mockCookieStoreMap.get('access_password')?.value).toBe('access-pass');
    });

    it('returns false when password is incorrect', async () => {
      const result = await verifyAccessPassword('wrong-pass');
      expect(result).toBe(false);
      expect(mockCookieStoreMap.get('access_password')).toBeUndefined();
    });

    it('returns false and warns when env password is not set', async () => {
      delete process.env.NEXT_CURRICULUM_ACCESS_PASSWORD;
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const result = await verifyAccessPassword('access-pass');
      expect(result).toBe(false);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
  });

  describe('verifyEditorPassword', () => {
    it('returns true and sets cookie when password is correct', async () => {
      const result = await verifyEditorPassword('editor-pass');
      expect(result).toBe(true);
      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'editor_password',
        'editor-pass',
        expect.any(Object)
      );
      expect(mockCookieStoreMap.get('editor_password')?.value).toBe('editor-pass');
    });

    it('returns false when password is incorrect', async () => {
      const result = await verifyEditorPassword('wrong-pass');
      expect(result).toBe(false);
      expect(mockCookieStoreMap.get('editor_password')).toBeUndefined();
    });

    it('returns false and warns when env password is not set', async () => {
      delete process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD;
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const result = await verifyEditorPassword('editor-pass');
      expect(result).toBe(false);
      expect(warnSpy).toHaveBeenCalled();
      warnSpy.mockRestore();
    });
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
});

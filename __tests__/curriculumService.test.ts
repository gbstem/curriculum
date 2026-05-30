import {
  getAllCurriculum,
  getCurriculumByCourseAndLesson,
  getCurriculumByCourse,
  saveCurriculum,
  getVersionHistory,
  restoreVersion,
  deleteCurriculum,
} from '../app/services/curriculumService';
import { saveCurriculumAction, restoreVersionAction, deleteCurriculumAction } from '../app/actions';
import { getDocs } from 'firebase/firestore';

// Mock the server actions
jest.mock('../app/actions', () => ({
  saveCurriculumAction: jest.fn(),
  restoreVersionAction: jest.fn(),
  deleteCurriculumAction: jest.fn(),
}));

describe('curriculumService tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('read operations (client Firestore SDK)', () => {
    const dummyDocs = [
      {
        id: 'doc1',
        data: () => ({ course: 'python1A', lessonNumber: 2, title: 'Lesson 2' }),
      },
      {
        id: 'doc2',
        data: () => ({ course: 'python1A', lessonNumber: 1, title: 'Lesson 1' }),
      },
    ];

    it('getAllCurriculum gets all documents from firestore', async () => {
      const mockSnapshot = {
        forEach: (callback: any) => dummyDocs.forEach(callback),
      };
      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await getAllCurriculum();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('doc1');
      expect(result[1].id).toBe('doc2');
      expect(getDocs).toHaveBeenCalled();
    });

    it('getCurriculumByCourseAndLesson gets a single matched document', async () => {
      const mockSnapshot = {
        empty: false,
        docs: [dummyDocs[1]],
      };
      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await getCurriculumByCourseAndLesson('python1A', 1);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('doc2');
      expect(result?.lessonNumber).toBe(1);
    });

    it('getCurriculumByCourseAndLesson returns null if not found', async () => {
      const mockSnapshot = {
        empty: true,
      };
      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await getCurriculumByCourseAndLesson('python1A', 99);
      expect(result).toBeNull();
    });

    it('getCurriculumByCourse returns sorted lessons', async () => {
      const mockSnapshot = {
        forEach: (callback: any) => dummyDocs.forEach(callback),
      };
      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await getCurriculumByCourse('python1A');
      expect(result).toHaveLength(2);
      // Result should be sorted by lessonNumber: Lesson 1 first, then Lesson 2
      expect(result[0].lessonNumber).toBe(1);
      expect(result[1].lessonNumber).toBe(2);
    });

    it('getVersionHistory returns sorted history by timestamp descending', async () => {
      const dummyVersionDocs = [
        {
          id: 'v1',
          data: () => ({
            course: 'python1A',
            lessonNumber: 1,
            title: 'Lesson 1 v1',
            versionTimestamp: { toDate: () => new Date('2026-05-29T12:00:00Z') },
          }),
        },
        {
          id: 'v2',
          data: () => ({
            course: 'python1A',
            lessonNumber: 1,
            title: 'Lesson 1 v2',
            versionTimestamp: { toDate: () => new Date('2026-05-29T13:00:00Z') },
          }),
        },
      ];
      const mockSnapshot = {
        forEach: (callback: any) => dummyVersionDocs.forEach(callback),
      };
      (getDocs as jest.Mock).mockResolvedValueOnce(mockSnapshot);

      const result = await getVersionHistory('python1A', 1);
      expect(result).toHaveLength(2);
      // Sorted by timestamp descending: newer (v2) first
      expect(result[0].id).toBe('v2');
      expect(result[1].id).toBe('v1');
    });
    it('getAllCurriculum handles errors', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));
      await expect(getAllCurriculum()).rejects.toThrow('Firestore error');
    });

    it('getCurriculumByCourseAndLesson handles errors', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));
      await expect(getCurriculumByCourseAndLesson('python1A', 1)).rejects.toThrow(
        'Firestore error'
      );
    });

    it('getCurriculumByCourse handles errors', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));
      await expect(getCurriculumByCourse('python1A')).rejects.toThrow('Firestore error');
    });

    it('getVersionHistory handles errors', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));
      await expect(getVersionHistory('python1A', 1)).rejects.toThrow('Firestore error');
    });
  });

  describe('write/delete operations (wrapping server actions)', () => {
    const dummyCurriculum = {
      course: 'python1A',
      lessonNumber: 1,
      title: 'Intro to Python',
      moduleTitle: 'Getting Started',
      content: '# Hello Python',
    };

    it('saveCurriculum delegates to saveCurriculumAction', async () => {
      (saveCurriculumAction as jest.Mock).mockResolvedValueOnce('saved-id');

      const result = await saveCurriculum(dummyCurriculum);
      expect(result).toBe('saved-id');
      expect(saveCurriculumAction).toHaveBeenCalledWith(dummyCurriculum);
    });

    it('restoreVersion delegates to restoreVersionAction', async () => {
      (restoreVersionAction as jest.Mock).mockResolvedValueOnce('restored-id');

      const result = await restoreVersion('version-id', 'original-id');
      expect(result).toBe('restored-id');
      expect(restoreVersionAction).toHaveBeenCalledWith('version-id', 'original-id');
    });

    it('deleteCurriculum delegates to deleteCurriculumAction', async () => {
      (deleteCurriculumAction as jest.Mock).mockResolvedValueOnce(undefined);

      await deleteCurriculum('doc-to-delete');
      expect(deleteCurriculumAction).toHaveBeenCalledWith('doc-to-delete');
    });
  });
});

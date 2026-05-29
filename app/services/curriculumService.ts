import { collection, getDocs, query, where, FieldValue, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { saveCurriculumAction, restoreVersionAction, deleteCurriculumAction } from '../actions';

// Collection names
const CURRICULUM_COLLECTION = 'curriculum';
const VERSIONS_COLLECTION = 'curriculum_versions';

export interface CurriculumItem {
  id?: string;
  course: string;
  lessonNumber: number;
  title: string;
  moduleTitle: string;
  content: string;
  createdAt?: Timestamp | FieldValue;
  lastModified?: Timestamp | FieldValue;
}

export interface CurriculumVersion {
  id?: string;
  course: string;
  lessonNumber: number;
  title: string;
  moduleTitle: string;
  content: string;
  versionTimestamp: Timestamp | FieldValue;
  versionNumber: number;
}

// Get all curriculum data
export const getAllCurriculum = async (): Promise<CurriculumItem[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, CURRICULUM_COLLECTION));
    const curriculum: CurriculumItem[] = [];
    querySnapshot.forEach((doc) => {
      curriculum.push({ id: doc.id, ...doc.data() } as CurriculumItem);
    });
    return curriculum;
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Get curriculum by course and lesson
export const getCurriculumByCourseAndLesson = async (
  course: string,
  lessonNumber: number | string
): Promise<CurriculumItem | null> => {
  try {
    // Convert lessonNumber to number to ensure proper comparison
    const lessonNum = typeof lessonNumber === 'string' ? parseInt(lessonNumber, 10) : lessonNumber;

    const q = query(
      collection(db, CURRICULUM_COLLECTION),
      where('course', '==', course),
      where('lessonNumber', '==', lessonNum)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() } as CurriculumItem;
    }
    return null;
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Get curriculum by course
export const getCurriculumByCourse = async (course: string): Promise<CurriculumItem[]> => {
  try {
    const q = query(collection(db, CURRICULUM_COLLECTION), where('course', '==', course));
    const querySnapshot = await getDocs(q);
    const curriculum: CurriculumItem[] = [];
    querySnapshot.forEach((doc) => {
      curriculum.push({ id: doc.id, ...doc.data() } as CurriculumItem);
    });
    // Sort in memory instead of using orderBy to avoid index requirement
    return curriculum.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Save curriculum (creates new version)
export const saveCurriculum = async (curriculumData: CurriculumItem): Promise<string> => {
  return await saveCurriculumAction(curriculumData);
};

// Get version history for a curriculum item
export const getVersionHistory = async (
  course: string,
  lessonNumber: number
): Promise<CurriculumVersion[]> => {
  try {
    const q = query(
      collection(db, VERSIONS_COLLECTION),
      where('course', '==', course),
      where('lessonNumber', '==', lessonNumber)
    );
    const querySnapshot = await getDocs(q);
    const versions: CurriculumVersion[] = [];
    querySnapshot.forEach((doc) => {
      versions.push({ id: doc.id, ...doc.data() } as CurriculumVersion);
    });
    // Sort in memory instead of using orderBy to avoid index requirement
    return versions.sort((a, b) => {
      const aTime =
        (a.versionTimestamp as any)?.toDate?.() || new Date((a.versionTimestamp as any) || 0);
      const bTime =
        (b.versionTimestamp as any)?.toDate?.() || new Date((b.versionTimestamp as any) || 0);
      return bTime.getTime() - aTime.getTime(); // Descending order
    });
  } catch (error) {
    console.error('Error getting version history:', error);
    throw error;
  }
};

// Restore a specific version
export const restoreVersion = async (
  versionId: string,
  originalCurriculumId: string
): Promise<string> => {
  return await restoreVersionAction(versionId, originalCurriculumId);
};

// Delete curriculum
export const deleteCurriculum = async (curriculumId: string): Promise<void> => {
  await deleteCurriculumAction(curriculumId);
};

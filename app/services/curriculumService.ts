import { FieldValue, Timestamp } from 'firebase/firestore';
import {
  deleteCurriculumAction,
  getAllCurriculumAction,
  getCurriculumByCourseAction,
  getCurriculumByCourseAndLessonAction,
  getVersionHistoryAction,
  restoreVersionAction,
  saveCurriculumAction,
} from '../actions';

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

function deserializeTimestamp(ts: any) {
  if (!ts) return null;
  if (typeof ts === 'string') return ts;
  if (typeof ts === 'object' && 'seconds' in ts) {
    return {
      ...ts,
      toDate: () => new Date(ts.seconds * 1000 + (ts.nanoseconds || 0) / 1000000),
    };
  }
  return ts;
}

// Get all curriculum data
export const getAllCurriculum = async (): Promise<CurriculumItem[]> => {
  const data = await getAllCurriculumAction();
  return data.map((item) => ({
    ...item,
    createdAt: deserializeTimestamp(item.createdAt),
    lastModified: deserializeTimestamp(item.lastModified),
  })) as CurriculumItem[];
};

// Get curriculum by course and lesson
export const getCurriculumByCourseAndLesson = async (
  course: string,
  lessonNumber: number | string
): Promise<CurriculumItem | null> => {
  const lessonNum = typeof lessonNumber === 'string' ? parseInt(lessonNumber, 10) : lessonNumber;
  const item = await getCurriculumByCourseAndLessonAction(course, lessonNum);
  if (!item) return null;
  return {
    ...item,
    createdAt: deserializeTimestamp(item.createdAt),
    lastModified: deserializeTimestamp(item.lastModified),
  } as CurriculumItem;
};

// Get curriculum by course
export const getCurriculumByCourse = async (course: string): Promise<CurriculumItem[]> => {
  const data = await getCurriculumByCourseAction(course);
  const curriculum = data.map((item) => ({
    ...item,
    createdAt: deserializeTimestamp(item.createdAt),
    lastModified: deserializeTimestamp(item.lastModified),
  })) as CurriculumItem[];

  // Sort in memory instead of using orderBy to avoid index requirement
  return curriculum.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
};

// Save curriculum (creates new version)
export const saveCurriculum = async (curriculumData: CurriculumItem): Promise<string> => {
  // Strip non-serializable fields (like Firestore Timestamps) before passing to the Server Action
  const cleanData = { ...curriculumData };
  delete cleanData.createdAt;
  delete cleanData.lastModified;
  return await saveCurriculumAction(cleanData);
};

// Get version history for a curriculum item
export const getVersionHistory = async (
  course: string,
  lessonNumber: number
): Promise<CurriculumVersion[]> => {
  const data = await getVersionHistoryAction(course, lessonNumber);
  const versions = data.map((item) => ({
    ...item,
    versionTimestamp: deserializeTimestamp(item.versionTimestamp),
  })) as CurriculumVersion[];

  // Sort in memory instead of using orderBy to avoid index requirement
  return versions.sort((a, b) => {
    const aTime =
      (a.versionTimestamp as any)?.toDate?.() || new Date((a.versionTimestamp as any) || 0);
    const bTime =
      (b.versionTimestamp as any)?.toDate?.() || new Date((b.versionTimestamp as any) || 0);
    return bTime.getTime() - aTime.getTime(); // Descending order
  });
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

/*
 * Defines server-side code for secure data access and other operations
 * where we want to avoid exposing environment variables to the client
 * browser which contain secrets like api keys and passwords. This
 * includes accessing Firebase Firestore and Storage, because we need to
 * make sure only this website can access Firebase, and that means having
 * a secure server-side private key for accessing the database.
 */

'use server';

import { SessionData, sessionOptions } from '@/lib/session';
import * as admin from 'firebase-admin';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { adminDb } from './firebase-admin';
import { CurriculumItem, CurriculumVersion } from './services/curriculumService';

// Collection names
const CURRICULUM_COLLECTION = 'curriculum';
const VERSIONS_COLLECTION = 'curriculum_versions';

// Helper to check if authorized as editor
async function checkEditorAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session.isLoggedIn && session.role === 'editor';
}

// Helper to check if authorized as viewer or editor
async function checkViewerAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session.isLoggedIn && (session.role === 'viewer' || session.role === 'editor');
}

async function withTimeout<T>(promise: Promise<T>, context: string, timeoutMs = 10000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Database operation timed out (${context})`));
    }, timeoutMs);
  });
  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timer!);
    return result;
  } catch (err: any) {
    clearTimeout(timer!);
    console.error(`[Firestore Error] ${context}:`, err);
    throw new Error(
      `Failed to perform database operation (${context}): ${err.message || err.toString()}`
    );
  }
}

function serializeTimestamp(ts: any) {
  if (!ts) return null;
  if (typeof ts === 'string') return ts;
  if (typeof ts.toDate === 'function') {
    const d = ts.toDate();
    return { seconds: Math.floor(d.getTime() / 1000), nanoseconds: (d.getTime() % 1000) * 1000000 };
  }
  if (typeof ts.seconds === 'number') {
    return { seconds: ts.seconds, nanoseconds: ts.nanoseconds || 0 };
  }
  return null;
}

export async function getAllCurriculumAction(): Promise<CurriculumItem[]> {
  const isAuthorized = await checkViewerAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing access permission.');
  }

  try {
    const querySnapshot = await withTimeout(
      adminDb.collection(CURRICULUM_COLLECTION).get(),
      'getting all curriculum items'
    );
    const curriculum: CurriculumItem[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      curriculum.push({
        id: doc.id,
        course: data.course,
        lessonNumber: data.lessonNumber,
        title: data.title,
        moduleTitle: data.moduleTitle,
        content: data.content,
        createdAt: serializeTimestamp(data.createdAt),
        lastModified: serializeTimestamp(data.lastModified),
      } as any);
    });
    return curriculum;
  } catch (error: any) {
    console.error('Error in getAllCurriculumAction:', error);
    throw new Error('Failed to get all curriculum: ' + error.message);
  }
}

export async function getCurriculumByCourseAction(course: string): Promise<CurriculumItem[]> {
  const isAuthorized = await checkViewerAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing access permission.');
  }

  try {
    const querySnapshot = await withTimeout(
      adminDb.collection(CURRICULUM_COLLECTION).where('course', '==', course).get(),
      `getting curriculum items for course ${course}`
    );
    const curriculum: CurriculumItem[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      curriculum.push({
        id: doc.id,
        course: data.course,
        lessonNumber: data.lessonNumber,
        title: data.title,
        moduleTitle: data.moduleTitle,
        content: data.content,
        createdAt: serializeTimestamp(data.createdAt),
        lastModified: serializeTimestamp(data.lastModified),
      } as any);
    });
    return curriculum;
  } catch (error: any) {
    console.error(`Error in getCurriculumByCourseAction (course: ${course}):`, error);
    throw new Error('Failed to get curriculum for course: ' + error.message);
  }
}

export async function getCurriculumByCourseAndLessonAction(
  course: string,
  lessonNumber: number
): Promise<CurriculumItem | null> {
  const isAuthorized = await checkViewerAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing access permission.');
  }

  try {
    const querySnapshot = await withTimeout(
      adminDb
        .collection(CURRICULUM_COLLECTION)
        .where('course', '==', course)
        .where('lessonNumber', '==', lessonNumber)
        .get(),
      `getting curriculum item for course ${course} lesson ${lessonNumber}`
    );
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: doc.id,
        course: data.course,
        lessonNumber: data.lessonNumber,
        title: data.title,
        moduleTitle: data.moduleTitle,
        content: data.content,
        createdAt: serializeTimestamp(data.createdAt),
        lastModified: serializeTimestamp(data.lastModified),
      } as any;
    }
    return null;
  } catch (error: any) {
    console.error(
      `Error in getCurriculumByCourseAndLessonAction (course: ${course}, lesson: ${lessonNumber}):`,
      error
    );
    throw new Error('Failed to get lesson details: ' + error.message);
  }
}

export async function getVersionHistoryAction(
  course: string,
  lessonNumber: number
): Promise<CurriculumVersion[]> {
  const isAuthorized = await checkViewerAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing access permission.');
  }

  try {
    const querySnapshot = await withTimeout(
      adminDb
        .collection(VERSIONS_COLLECTION)
        .where('course', '==', course)
        .where('lessonNumber', '==', lessonNumber)
        .get(),
      `getting version history for course ${course} lesson ${lessonNumber}`
    );
    const versions: CurriculumVersion[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      versions.push({
        id: doc.id,
        course: data.course,
        lessonNumber: data.lessonNumber,
        title: data.title,
        moduleTitle: data.moduleTitle,
        content: data.content,
        versionTimestamp: serializeTimestamp(data.versionTimestamp),
        versionNumber: data.versionNumber,
      } as any);
    });
    return versions;
  } catch (error: any) {
    console.error(
      `Error in getVersionHistoryAction (course: ${course}, lesson: ${lessonNumber}):`,
      error
    );
    throw new Error('Failed to get version history: ' + error.message);
  }
}

export async function saveCurriculumAction(curriculumData: CurriculumItem): Promise<string> {
  const isAuthorized = await checkEditorAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing editor password.');
  }

  try {
    const { id, course, lessonNumber, title, moduleTitle, content } = curriculumData;
    const cleanData = {
      course,
      lessonNumber: typeof lessonNumber === 'string' ? parseInt(lessonNumber, 10) : lessonNumber,
      title: title || '',
      moduleTitle: moduleTitle || '',
      content: content || '',
    };

    const versionData = {
      ...cleanData,
      versionTimestamp: admin.firestore.FieldValue.serverTimestamp(),
      versionNumber: Date.now(),
    };

    // Save history to versions collection
    await withTimeout(
      adminDb.collection(VERSIONS_COLLECTION).add(versionData),
      'adding version history record'
    );

    if (id) {
      // Update existing
      await withTimeout(
        adminDb
          .collection(CURRICULUM_COLLECTION)
          .doc(id)
          .update({
            ...cleanData,
            lastModified: admin.firestore.FieldValue.serverTimestamp(),
          }),
        `updating existing curriculum item ${id}`
      );
      return id;
    } else {
      // Create new
      const docRef = await withTimeout(
        adminDb.collection(CURRICULUM_COLLECTION).add({
          ...cleanData,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          lastModified: admin.firestore.FieldValue.serverTimestamp(),
        }),
        'creating new curriculum item'
      );
      return docRef.id;
    }
  } catch (error: any) {
    console.error('Error in saveCurriculumAction:', error);
    throw new Error('Failed to save curriculum: ' + error.message);
  }
}

export async function restoreVersionAction(
  versionId: string,
  originalCurriculumId: string
): Promise<string> {
  const isAuthorized = await checkEditorAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing editor password.');
  }

  try {
    const versionDoc = await withTimeout(
      adminDb.collection(VERSIONS_COLLECTION).doc(versionId).get(),
      `getting version history document ${versionId}`
    );
    if (versionDoc.exists) {
      const versionData = versionDoc.data() as CurriculumVersion;
      const curriculumData = { ...versionData };
      delete (curriculumData as any).versionTimestamp;
      delete (curriculumData as any).versionNumber;

      const curriculumDataWithId: CurriculumItem = {
        ...curriculumData,
        id: originalCurriculumId,
      };

      return await saveCurriculumAction(curriculumDataWithId);
    }
    throw new Error('Version not found');
  } catch (error: any) {
    console.error('Error in restoreVersionAction:', error);
    throw new Error('Failed to restore version: ' + error.message);
  }
}

export async function deleteCurriculumAction(curriculumId: string): Promise<void> {
  const isAuthorized = await checkEditorAuth();
  if (!isAuthorized) {
    throw new Error('Unauthorized: Incorrect or missing editor password.');
  }

  try {
    await withTimeout(
      adminDb.collection(CURRICULUM_COLLECTION).doc(curriculumId).delete(),
      `deleting curriculum item ${curriculumId}`
    );
  } catch (error: any) {
    console.error('Error in deleteCurriculumAction:', error);
    throw new Error('Failed to delete curriculum: ' + error.message);
  }
}

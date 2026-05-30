'use server';

import * as admin from 'firebase-admin';
import { cookies } from 'next/headers';
import { adminDb } from './firebase-admin';
import { CurriculumItem, CurriculumVersion } from './services/curriculumService';

// Collection names
const CURRICULUM_COLLECTION = 'curriculum';
const VERSIONS_COLLECTION = 'curriculum_versions';

// Helper to check if authorized as editor
async function checkEditorAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const editorPassword = cookieStore.get('editor_password')?.value;
  const correctPassword = process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD;
  return !!correctPassword && editorPassword === correctPassword;
}

export async function verifyAccessPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD;
  if (!correctPassword) {
    console.warn('NEXT_CURRICULUM_VIEWER_ACCESS_PASSWORD is not set in the environment variables!');
    return false;
  }
  const isValid = password === correctPassword;
  if (isValid) {
    const cookieStore = await cookies();
    cookieStore.set('access_password', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
  }
  return isValid;
}

export async function verifyEditorPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD;
  if (!correctPassword) {
    console.warn('NEXT_CURRICULUM_EDITOR_ACCESS_PASSWORD is not set in the environment variables!');
    return false;
  }
  const isValid = password === correctPassword;
  if (isValid) {
    const cookieStore = await cookies();
    cookieStore.set('editor_password', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
  }
  return isValid;
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
    await adminDb.collection(VERSIONS_COLLECTION).add(versionData);

    if (id) {
      // Update existing
      await adminDb
        .collection(CURRICULUM_COLLECTION)
        .doc(id)
        .update({
          ...cleanData,
          lastModified: admin.firestore.FieldValue.serverTimestamp(),
        });
      return id;
    } else {
      // Create new
      const docRef = await adminDb.collection(CURRICULUM_COLLECTION).add({
        ...cleanData,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastModified: admin.firestore.FieldValue.serverTimestamp(),
      });
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
    const versionDoc = await adminDb.collection(VERSIONS_COLLECTION).doc(versionId).get();
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
    await adminDb.collection(CURRICULUM_COLLECTION).doc(curriculumId).delete();
  } catch (error: any) {
    console.error('Error in deleteCurriculumAction:', error);
    throw new Error('Failed to delete curriculum: ' + error.message);
  }
}

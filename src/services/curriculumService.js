import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection names
const CURRICULUM_COLLECTION = 'curriculum';
const VERSIONS_COLLECTION = 'curriculum_versions';

// Get all curriculum data
export const getAllCurriculum = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, CURRICULUM_COLLECTION));
    const curriculum = [];
    querySnapshot.forEach((doc) => {
      curriculum.push({ id: doc.id, ...doc.data() });
    });
    return curriculum;
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Get curriculum by course and lesson
export const getCurriculumByCourseAndLesson = async (course, lessonNumber) => {
  try {
    // Convert lessonNumber to number to ensure proper comparison
    const lessonNum = parseInt(lessonNumber);
    
    const q = query(
      collection(db, CURRICULUM_COLLECTION),
      where('course', '==', course),
      where('lessonNumber', '==', lessonNum)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Get curriculum by course
export const getCurriculumByCourse = async (course) => {
  try {
    const q = query(
      collection(db, CURRICULUM_COLLECTION),
      where('course', '==', course)
    );
    const querySnapshot = await getDocs(q);
    const curriculum = [];
    querySnapshot.forEach((doc) => {
      curriculum.push({ id: doc.id, ...doc.data() });
    });
    // Sort in memory instead of using orderBy to avoid index requirement
    return curriculum.sort((a, b) => (a.lessonNumber || 0) - (b.lessonNumber || 0));
  } catch (error) {
    console.error('Error getting curriculum:', error);
    throw error;
  }
};

// Save curriculum (creates new version)
export const saveCurriculum = async (curriculumData) => {
  try {
    // First, save the current version to versions collection
    const versionData = {
      ...curriculumData,
      versionTimestamp: serverTimestamp(),
      versionNumber: Date.now() // Simple version numbering
    };
    
    await addDoc(collection(db, VERSIONS_COLLECTION), versionData);
    
    // Then update or create the current version
    if (curriculumData.id) {
      // Update existing
      const docRef = doc(db, CURRICULUM_COLLECTION, curriculumData.id);
      await updateDoc(docRef, {
        ...curriculumData,
        lastModified: serverTimestamp()
      });
      return curriculumData.id;
    } else {
      // Create new
      const docRef = await addDoc(collection(db, CURRICULUM_COLLECTION), {
        ...curriculumData,
        createdAt: serverTimestamp(),
        lastModified: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error saving curriculum:', error);
    throw error;
  }
};

// Get version history for a curriculum item
export const getVersionHistory = async (course, lessonNumber) => {
  try {
    const q = query(
      collection(db, VERSIONS_COLLECTION),
      where('course', '==', course),
      where('lessonNumber', '==', lessonNumber)
    );
    const querySnapshot = await getDocs(q);
    const versions = [];
    querySnapshot.forEach((doc) => {
      versions.push({ id: doc.id, ...doc.data() });
    });
    // Sort in memory instead of using orderBy to avoid index requirement
    return versions.sort((a, b) => {
      const aTime = a.versionTimestamp?.toDate?.() || new Date(a.versionTimestamp || 0);
      const bTime = b.versionTimestamp?.toDate?.() || new Date(b.versionTimestamp || 0);
      return bTime - aTime; // Descending order
    });
  } catch (error) {
    console.error('Error getting version history:', error);
    throw error;
  }
};

// Restore a specific version
export const restoreVersion = async (versionId) => {
  try {
    const versionDoc = await getDoc(doc(db, VERSIONS_COLLECTION, versionId));
    if (versionDoc.exists()) {
      const versionData = versionDoc.data();
      // Remove version-specific fields
      const { versionTimestamp, versionNumber, id, ...curriculumData } = versionData;
      
      // Save as current version
      return await saveCurriculum(curriculumData);
    }
    throw new Error('Version not found');
  } catch (error) {
    console.error('Error restoring version:', error);
    throw error;
  }
};

// Delete curriculum
export const deleteCurriculum = async (curriculumId) => {
  try {
    await deleteDoc(doc(db, CURRICULUM_COLLECTION, curriculumId));
  } catch (error) {
    console.error('Error deleting curriculum:', error);
    throw error;
  }
}; 

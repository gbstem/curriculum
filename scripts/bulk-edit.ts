// Tool to run bulk edits across all active curriculum lessons in Firestore.
//
// Usage:
//   yarn bulk-edit               # Dry run (default: preview changes, no Firestore writes)
//   yarn bulk-edit --write       # Execute bulk edit and write changes to Firestore
//   yarn bulk-edit --dry-run=false
//
import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { tracks } from '../app/data/tracks';

// Load local environment variables from .env.local if present
export function loadEnvLocal(): void {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    for (const line of envConfig.split('\n')) {
      const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)?$/);
      if (match) {
        const key = match[1].trim();
        let value = (match[2] || '').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        value = value.replace(/\\n/g, '\n');
        process.env[key] = value;
      }
    }
  }
}

// Get or initialize Firebase Admin Firestore instance
export function getFirestoreDb(): admin.firestore.Firestore {
  loadEnvLocal();
  if (!admin.apps.length) {
    const projectId =
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    if (
      privateKey &&
      privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
      !privateKey.includes('...') &&
      clientEmail &&
      projectId
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      admin.initializeApp({
        projectId: projectId || 'demo-gbstem-curriculum',
      });
    }
  }
  return admin.firestore();
}

/**
 * Type signature for the bulk edit callback.
 * Receives trackId, courseId, lessonNumber, and lessonContent.
 * Returns either the updated lessonContent (string) or null if no change is needed.
 */
export type EditFunction = (
  trackId: string,
  courseId: string,
  lessonNumber: number,
  lessonContent: string
) => string | null | Promise<string | null>;

/**
 * Default edit function example.
 * Customize or replace this function with your specific bulk transformation logic!
 */
export const defaultEditFunction: EditFunction = (
  _trackId: string,
  _courseId: string,
  _lessonNumber: number,
  _lessonContent: string
): string | null => {
  // Return updated markdown content string to write a new version,
  // or return null to keep content unchanged.
  return null;
};

export interface LessonDocument {
  id: string;
  course: string;
  lessonNumber: number;
  title: string;
  moduleTitle?: string;
  content: string;
}

export interface bulkEditOptions {
  editFn?: EditFunction;
  dryRun?: boolean;
  db?: admin.firestore.Firestore;
  backupPath?: string;
}

export interface bulkEditResult {
  totalDocs: number;
  validDocs: number;
  filteredDocs: number;
  changedDocs: number;
  writtenDocs: number;
}

/**
 * Build mapping from valid course ID -> track ID based on tracks.ts
 */
export function getCourseToTrackMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const track of tracks) {
    for (const course of track.courses) {
      map.set(course.id, track.id);
    }
  }
  return map;
}

/**
 * Main bulk edit runner.
 */
export async function runBulkEdit(options: bulkEditOptions = {}): Promise<bulkEditResult> {
  const courseToTrackMap = getCourseToTrackMap();
  const editFn = options.editFn || defaultEditFunction;

  // Determine dry run flag (default to true: dry run mode)
  let dryRun = options.dryRun;
  if (dryRun === undefined) {
    const args = process.argv.slice(2);
    if (
      args.includes('--write') ||
      args.includes('--dry-run=false') ||
      args.includes('--no-dry-run')
    ) {
      dryRun = false;
    } else {
      dryRun = true;
    }
  }

  console.log('============================================================');
  console.log('Curriculum Firestore Bulk Edit Tool');
  console.log(
    `Mode: ${dryRun ? 'DRY RUN (No writes to Firestore)' : 'WRITE MODE (Changes WILL be saved to Firestore)'}`
  );
  if (dryRun) {
    console.log('To apply changes to Firestore, run with --write or --dry-run=false');
  }
  console.log('============================================================\n');

  let rawDocs: LessonDocument[] = [];
  let dbInstance: admin.firestore.Firestore | null = options.db || null;

  if (!dbInstance && !options.backupPath) {
    try {
      dbInstance = getFirestoreDb();
    } catch {
      dbInstance = null;
    }
  }

  // Fetch documents from Firestore if available
  if (dbInstance) {
    try {
      console.log('Fetching curriculum collection from Firestore...');
      const snapshot = await dbInstance.collection('curriculum').get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        rawDocs.push({
          id: doc.id,
          course: (data.course || '').trim(),
          lessonNumber: data.lessonNumber ?? 0,
          title: (data.title || '').trim(),
          moduleTitle: data.moduleTitle,
          content: data.content || '',
        });
      });
      console.log(`Fetched ${rawDocs.length} documents from Firestore.`);
    } catch (err: any) {
      console.warn(`Firestore read failed (${err.message}). Attempting fallback to backup file...`);
      rawDocs = [];
    }
  }

  // Fallback to local firebase-backup.json if Firestore fetch was empty or failed
  if (rawDocs.length === 0) {
    const backupFile = options.backupPath || path.resolve(process.cwd(), 'firebase-backup.json');
    if (fs.existsSync(backupFile)) {
      console.log(`Reading backup file at: ${backupFile}`);
      const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));
      const items = Array.isArray(backupData.curriculum)
        ? backupData.curriculum
        : Object.values(backupData.curriculum || {});
      for (const item of items as any[]) {
        const data = item.data || item;
        rawDocs.push({
          id: data.id || item.id || '',
          course: (data.course || '').trim(),
          lessonNumber: data.lessonNumber ?? 0,
          title: (data.title || '').trim(),
          moduleTitle: data.moduleTitle,
          content: data.content || '',
        });
      }
      console.log(`Loaded ${rawDocs.length} documents from backup file.`);
    }
  }

  const result: bulkEditResult = {
    totalDocs: rawDocs.length,
    validDocs: 0,
    filteredDocs: 0,
    changedDocs: 0,
    writtenDocs: 0,
  };

  for (const doc of rawDocs) {
    const courseId = doc.course;
    if (!courseToTrackMap.has(courseId)) {
      result.filteredDocs++;
      continue;
    }

    result.validDocs++;
    const trackId = courseToTrackMap.get(courseId)!;
    const lessonNumber = doc.lessonNumber;
    const oldContent = doc.content;

    // Call the edit function for this active lesson
    const newContent = await editFn(trackId, courseId, lessonNumber, oldContent);

    // If newContent is returned and different from oldContent
    if (newContent !== null && newContent !== undefined && newContent !== oldContent) {
      result.changedDocs++;

      console.log(`\n------------------------------------------------------------`);
      console.log(`[CHANGE DETECTED] ID: ${doc.id}`);
      console.log(
        `Track: ${trackId} | Course: ${courseId} | Lesson: ${lessonNumber} | Title: "${doc.title}"`
      );
      console.log(`--- OLD CONTENT (${oldContent.length} chars) ---`);
      console.log(oldContent);
      console.log(`--- NEW CONTENT (${newContent.length} chars) ---`);
      console.log(newContent);
      console.log(`------------------------------------------------------------`);

      if (dryRun) {
        console.log(`[DRY RUN] Would write version to Firestore for lesson doc ID: ${doc.id}`);
      } else {
        if (!dbInstance) {
          dbInstance = getFirestoreDb();
        }

        const editData = {
          course: doc.course,
          lessonNumber: doc.lessonNumber,
          title: doc.title || '',
          moduleTitle: doc.moduleTitle || '',
          content: newContent,
        };

        const versionData = {
          ...editData,
          versionTimestamp: admin.firestore.FieldValue.serverTimestamp(),
          versionNumber: Date.now(),
        };

        // 1. Add version record to curriculum_versions
        await dbInstance.collection('curriculum_versions').add(versionData);

        // 2. Update existing lesson document in curriculum
        await dbInstance.collection('curriculum').doc(doc.id).update({
          content: newContent,
          lastModified: admin.firestore.FieldValue.serverTimestamp(),
        });

        result.writtenDocs++;
        console.log(`[WRITTEN] Saved new version to Firestore for lesson doc ID: ${doc.id}`);
      }
    }
  }

  console.log('\n============================================================');
  console.log('Bulk Edit Execution Summary:');
  console.log(`  Mode:              ${dryRun ? 'DRY RUN' : 'WRITE'}`);
  console.log(`  Total documents:   ${result.totalDocs}`);
  console.log(`  Active track docs: ${result.validDocs}`);
  console.log(`  Filtered (orphans):${result.filteredDocs}`);
  console.log(`  Lessons changed:   ${result.changedDocs}`);
  console.log(`  Writes executed:   ${result.writtenDocs}`);
  console.log('============================================================\n');

  return result;
}

// Execute directly if run via CLI
if (require.main === module) {
  runBulkEdit()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error('Fatal error during bulk edit execution:', err);
      process.exit(1);
    });
}

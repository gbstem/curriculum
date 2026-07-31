// Tool to process the firebase-backup.json file downloaded from production
// via "yarn db:pull", and identify orphaned lessons that are not visible
// in the curriculum website due to using outdated or incorrect class names.
//
// Usage:
//   yarn recover-orphaned-lessons
//
// This will create a file named "orphaned-lessons.md" in the
// "curriculum" directory with a list of all orphaned lessons.
import fs from 'fs';
import path from 'path';
import { tracks } from '../app/data/tracks';

// Extract set of all valid course IDs from tracks.ts
const validCourseIds = new Set<string>();
for (const track of tracks) {
  for (const course of track.courses) {
    validCourseIds.add(course.id);
  }
}

console.log(
  `Valid course IDs in tracks.ts (${validCourseIds.size}):`,
  Array.from(validCourseIds).sort().join(', ')
);

// Read firebase-backup.json
const backupPath = path.join(__dirname, '../firebase-backup.json');
const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
const items = Array.isArray(backupData.curriculum)
  ? backupData.curriculum
  : Object.values(backupData.curriculum);

interface LessonDoc {
  id: string;
  course: string;
  lessonNumber: number;
  title: string;
  content: string;
}

const orphanedLessons: LessonDoc[] = [];
let validCount = 0;

for (const item of items as any[]) {
  const data = item.data || item;
  const course = (data.course || 'unknown').trim();
  const id = data.id || item.id || 'unknown';
  const lessonNumber = data.lessonNumber ?? 0;
  const title = (data.title || 'Untitled').trim();
  const content = (data.content || '').trim();

  if (!validCourseIds.has(course)) {
    orphanedLessons.push({
      id,
      course,
      lessonNumber,
      title,
      content,
    });
  } else {
    validCount++;
  }
}

// Sort by: course (asc), lessonNumber (numeric asc), then title (asc)
orphanedLessons.sort((a, b) => {
  if (a.course !== b.course) {
    return a.course.localeCompare(b.course);
  }
  if (a.lessonNumber !== b.lessonNumber) {
    return a.lessonNumber - b.lessonNumber;
  }
  return a.title.localeCompare(b.title);
});

// Summary breakdown by course
const courseCounts: Record<string, number> = {};
for (const lesson of orphanedLessons) {
  courseCounts[lesson.course] = (courseCounts[lesson.course] || 0) + 1;
}

console.log(`\nFound ${orphanedLessons.length} orphaned lessons (${validCount} active lessons).`);
console.log('Orphaned breakdown by course ID:');
for (const [courseId, count] of Object.entries(courseCounts).sort((a, b) =>
  a[0].localeCompare(b[0])
)) {
  console.log(`  - ${courseId}: ${count} lessons`);
}

// Build the Markdown output
let markdown = '';

for (let i = 0; i < orphanedLessons.length; i++) {
  const lesson = orphanedLessons[i];
  markdown += `# [${lesson.course}] Lesson ${lesson.lessonNumber}: ${lesson.title} (ID: ${lesson.id})\n\n`;
  markdown += `${lesson.content}\n\n\n`;
}

// Write to orphaned-lessons.md in repo root
const outputPath = path.join(__dirname, '../orphaned-lessons.md');
fs.writeFileSync(outputPath, markdown, 'utf-8');
console.log(`\nSuccessfully wrote orphaned lessons report to: ${outputPath}`);

// Also write to /tmp/orphaned-lessons.md for easy external access
const tmpOutputPath = '/tmp/orphaned-lessons.md';
fs.writeFileSync(tmpOutputPath, markdown, 'utf-8');
console.log(`Copied to: ${tmpOutputPath}`);

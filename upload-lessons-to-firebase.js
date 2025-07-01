const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzaoDbIbfWSMTE-s2K1foXu-2BBqfBIRY",
  authDomain: "gbstem-core.firebaseapp.com",
  projectId: "gbstem-core",
  storageBucket: "gbstem-core.appspot.com",
  messagingSenderId: "589574443697",
  appId: "1:589574443697:web:2391c06586a873ad92c890",
  measurementId: "G-LZBE70CG0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to extract content from a lesson file
function extractContentFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Find the content variable definition
    const contentMatch = content.match(/const content = `([\s\S]*?)`;/);
    if (!contentMatch) {
      console.log(`No content found in ${filePath}`);
      return null;
    }
    
    let markdownContent = contentMatch[1];
    
    // Replace \` with `
    markdownContent = markdownContent.replace(/\\`/g, "`");
    
    // Extract lesson metadata
    const titleMatch = content.match(/title="([^"]*)"/);
    const lessonNumberMatch = content.match(/lessonNumber=\{(\d+)\}/);
    
    return {
      title: titleMatch ? titleMatch[1] : 'Untitled',
      lessonNumber: lessonNumberMatch ? parseInt(lessonNumberMatch[1]) : 0,
      content: markdownContent
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

// Function to get all lesson files from a directory
function getLessonFiles(directory) {
  const lessonFiles = [];
  
  try {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
      if (file.startsWith('lesson') && file.endsWith('.js')) {
        lessonFiles.push(path.join(directory, file));
      }
    });
  } catch (error) {
    console.error(`Error reading directory ${directory}:`, error.message);
  }
  
  return lessonFiles.sort();
}

// Function to upload lesson to Firebase
async function uploadLessonToFirebase(lessonData, courseName) {
  try {
    const lessonDoc = {
      course: courseName.toLowerCase(),
      lessonNumber: lessonData.lessonNumber,
      title: lessonData.title,
      content: lessonData.content,
      createdAt: new Date(),
      lastModified: new Date(),
      id: `${courseName.toLowerCase()}-lesson-${lessonData.lessonNumber}`
    };
    
    await setDoc(doc(db, 'curriculum', `${courseName.toLowerCase()}-lesson-${lessonData.lessonNumber}`), lessonDoc);
    
    console.log(`✅ Uploaded ${courseName} Lesson ${lessonData.lessonNumber}: ${lessonData.title}`);
    return true;
  } catch (error) {
    console.error(`❌ Error uploading ${courseName} Lesson ${lessonData.lessonNumber}:`, error.message);
    return false;
  }
}

// Main function to process all courses and optionally output to JSON
async function uploadAllLessons({ outputJson = false } = {}) {
  const courses = [
    { name: 'Scratch', path: 'src/CS/Scratch' },
    { name: 'Python1', path: 'src/CS/Python1' },
    { name: 'Python2', path: 'src/CS/Python2' }
  ];
  
  let allLessons = [];
  
  for (const course of courses) {
    console.log(`\n📚 Processing ${course.name} course...`);
    
    const lessonFiles = getLessonFiles(course.path);
    console.log(`Found ${lessonFiles.length} lesson files`);
    
    for (const filePath of lessonFiles) {
      const lessonData = extractContentFromFile(filePath);
      
      if (lessonData) {
        lessonData.course = course.name.toLowerCase();
        allLessons.push(lessonData);
        
        if (!outputJson) {
          await uploadLessonToFirebase(lessonData, course.name);
        }
      }
    }
  }
  
  if (outputJson) {
    fs.writeFileSync('all-curriculum-lessons.json', JSON.stringify(allLessons, null, 2));
    console.log(`\n📝 All lessons written to all-curriculum-lessons.json`);
    console.log(`Total lessons processed: ${allLessons.length}`);
  }
}

// Uncomment one of the following lines to choose the mode:
uploadAllLessons(); // To upload to Firebase
// uploadAllLessons({ outputJson: true }); // To output to JSON only


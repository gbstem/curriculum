# Firebase Setup Guide for gbSTEM Curriculum

This guide will help you set up Firebase Firestore for the gbSTEM curriculum editing system.

## Prerequisites

- A Firebase account
- Node.js and npm installed
- Basic knowledge of Firebase Console

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "gbstem-curriculum")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project, click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "gbstem-curriculum-web")
6. Copy the Firebase configuration object

## Step 4: Update Firebase Configuration

1. Open `src/firebase.js` in your project
2. Replace the placeholder configuration with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## Step 5: Install Dependencies

Run the following command to install the new dependencies:

```bash
npm install
```

## Step 6: Set up Firestore Security Rules (Optional)

For production, you should set up proper security rules. In the Firestore Database section:

1. Click on "Rules" tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to curriculum
    match /curriculum/{document} {
      allow read: if true;
      allow write: if request.auth != null || true; // Remove '|| true' for production
    }
    
    // Allow read access to curriculum versions
    match /curriculum_versions/{document} {
      allow read: if true;
      allow write: if request.auth != null || true; // Remove '|| true' for production
    }
  }
}
```

## Step 7: Test the Setup

1. Start your development server: `npm start`
2. Navigate to the CS courses page
3. Click "Edit Online" for any course
4. Enter the password "snow" when prompted
5. Try creating a new lesson or editing an existing one

## Features

### Curriculum Editing
- **Password Protection**: Enter "snow" to access the editor
- **Rich Text Editor**: Supports bold, italic, headers, lists, and more
- **Code Block Insertion**: Add Python, JavaScript, or Scratch blocks
- **Markdown Preview**: See how your content will look
- **Version History**: All changes are automatically saved with version tracking

### Code Block Support
- **Python**: Syntax highlighted Python code
- **JavaScript**: Syntax highlighted JavaScript code
- **Scratch Blocks**: Visual Scratch programming blocks
- **Other Languages**: HTML, CSS, Java, C++, and many more

### Version Management
- **Automatic Versioning**: Every save creates a new version
- **Version History**: View all previous versions of a lesson
- **Restore Versions**: Restore any previous version
- **Timestamp Tracking**: See when each version was created

## Database Structure

The Firestore database uses two collections:

### `curriculum` Collection
Documents contain:
- `id`: Auto-generated document ID
- `course`: Course name (e.g., "python1", "scratch")
- `lessonNumber`: Lesson number (integer)
- `title`: Lesson title
- `content`: Markdown content
- `moduleTitle`: Module title (optional)
- `createdAt`: Timestamp when created
- `lastModified`: Timestamp when last modified

### `curriculum_versions` Collection
Documents contain:
- All fields from curriculum collection
- `versionTimestamp`: When this version was created
- `versionNumber`: Unique version identifier

## Usage

### Adding a New Lesson
1. Navigate to a Firebase-based course (e.g., `/cs/firebase/python1`)
2. Click "Add New Lesson"
3. Enter the password "snow"
4. Fill in the lesson details
5. Use the rich text editor to create content
6. Click "Save"

### Editing an Existing Lesson
1. Navigate to a lesson page
2. Click "Edit Lesson"
3. Enter the password "snow"
4. Make your changes
5. Click "Save"

### Viewing Version History
1. Navigate to a lesson page
2. Click "Version History"
3. View all previous versions
4. Click "Restore" to restore a previous version

## Troubleshooting

### Firebase Connection Issues
- Check your Firebase configuration in `src/firebase.js`
- Ensure your project ID is correct
- Verify that Firestore is enabled in your Firebase project

### Permission Denied Errors
- Check your Firestore security rules
- Ensure you're using the correct Firebase project
- For development, make sure rules allow read/write access

### Editor Not Loading
- Check that all dependencies are installed: `npm install`
- Ensure you're using the correct password: "snow"
- Check browser console for JavaScript errors

## Security Notes

- The password "snow" is hardcoded for simplicity
- For production use, implement proper authentication
- Consider using Firebase Authentication for user management
- Set up proper Firestore security rules
- Regularly backup your curriculum data

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Firebase configuration
3. Ensure all dependencies are installed
4. Check that Firestore is properly set up 

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

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local` at the root of your project:

   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values with your actual Firebase web app configuration parameters:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   ```

3. The `app/firebase.ts` file is already configured to automatically read these values using `process.env.NEXT_PUBLIC_FIREBASE_*`. Do not commit `.env.local` to Git.

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
    // Allow public read access to curriculum
    match /curriculum/{document} {
      allow read: if true;
      allow write: if false; // Deny all public client writes (handled securely on the server via Server Actions)
    }

    // Allow public read access to curriculum versions
    match /curriculum_versions/{document} {
      allow read: if true;
      allow write: if false; // Deny all public client writes (handled securely on the server via Server Actions)
    }
  }
}
```

## Step 7: Test the Setup

1. Start your development server: `npm start`
2. Navigate to the CS courses page
3. Click "Edit Online" for any course
4. Enter the editor access password when prompted (contact one of the gbSTEM leads for the password)
5. Try creating a new lesson or editing an existing one

## Features

### Curriculum Editing

- **Password Protection**: Enter the editor access password to access the editor (contact one of the gbSTEM leads for the password)
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
3. Enter the editor access password (contact one of the gbSTEM leads for the password)
4. Fill in the lesson details
5. Use the rich text editor to create content
6. Click "Save"

### Editing an Existing Lesson

1. Navigate to a lesson page
2. Click "Edit Lesson"
3. Enter the editor access password (contact one of the gbSTEM leads for the password)
4. Make your changes
5. Click "Save"

### Viewing Version History

1. Navigate to a lesson page
2. Click "Version History"
3. View all previous versions
4. Click "Restore" to restore a previous version

## Troubleshooting

### Firebase Connection Issues

- Check your Firebase environment variables in `.env.local` and configuration in `app/firebase.ts`
- Ensure your project ID is correct
- Verify that Firestore is enabled in your Firebase project

### Permission Denied Errors

- Check your Firestore security rules
- Ensure you're using the correct Firebase project
- For development, make sure rules allow read/write access

### Editor Not Loading

- Check that all dependencies are installed: `npm install`
- Ensure you're using the correct editor password (refer to your `.env.local` file or contact a lead)
- Check browser console for JavaScript errors

## Security Notes

- Access and editor passwords are set via environment variables in `.env.local`
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

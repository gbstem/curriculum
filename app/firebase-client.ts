import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

/**
 * WARNING: SECURITY RULES & DATA ACCESS
 *
 * All Firestore and Storage database read/write operations must be performed
 * on the server-side via Server Actions in `app/actions.ts` (using the Firebase Admin
 * SDK configured in `app/firebase-admin.ts`). This ensures secure access using server-side
 * credentials rather than relying on client-side permissions.
 *
 * Client-side Firestore and Storage SDKs are disabled here to prevent direct, unauthenticated
 * client-side access. Client-side Auth is initialized below for future migration to
 * per-user Firebase accounts.
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase (SSR safe, avoids reinitializing in dev hot-reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth (client-side)
export const auth = getAuth(app);

const isBrowser = typeof window !== 'undefined';
const isDev = process.env.NODE_ENV === 'development';

if (isBrowser && isDev) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (
    projectId &&
    (projectId.startsWith('demo-') || (apiKey && apiKey.includes('AIzaSyA1234567890')))
  ) {
    console.log('Connecting Firebase Auth client SDK to local emulator...');
    try {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    } catch (err) {
      console.warn('Failed to connect to Firebase Auth emulator:', err);
    }
  }
}

export default app;

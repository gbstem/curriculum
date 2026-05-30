import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Handle escaped newlines in env variables
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined;

  try {
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
      // Falls back to FIRESTORE_EMULATOR_HOST or Application Default Credentials (ADC)
      admin.initializeApp({
        projectId: projectId || 'demo-gbstem-curriculum',
      });
    }
  } catch (err: any) {
    if (!/already exists/u.test(err.message)) {
      console.log('Firebase Admin Error:', err.stack);
    }
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export default admin;

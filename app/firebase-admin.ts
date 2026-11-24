import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// TODO: package.json pins jwks-rsa to ^3 (jose 4, which has a CJS build) via
// "resolutions". firebase-admin 14 asks for jwks-rsa 4, which requires the
// ESM-only jose 6, and Vercel's Node launcher (/opt/rust/nodejs.js) rejects
// that require() with ERR_REQUIRE_ESM even on Node 26 (found on admin's
// preview deployment, 2026-11-24). Try removing the resolution after a Vercel
// runtime update, and verify on a preview deployment, since local Node loads
// it fine. Keep in step with ../admin and ../portal.

if (!getApps().length) {
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
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      // Falls back to FIRESTORE_EMULATOR_HOST or Application Default Credentials (ADC)
      initializeApp({
        projectId: projectId || 'demo-gbstem-curriculum',
      });
    }
  } catch (err: any) {
    if (!/already exists/u.test(err.message)) {
      console.log('Firebase Admin Error:', err.stack);
    }
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();

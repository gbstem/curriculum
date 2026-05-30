/*
 * Script to pull Firestore collections from production and seed the
 * local Firestore emulator with that for development and testing.
 * This can also be used to make a local backup of the production
 * Firestore collections.
 *
 * To pull from production:
 *   yarn db:pull
 *
 * Then, to restore the local emulator with that data:
 *   yarn db:seed
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Load local environment variables from .env.local
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
      // Replace escaped newlines
      value = value.replace(/\\n/g, '\n');
      process.env[key] = value;
    }
  }
}

const BACKUP_FILE = path.resolve(process.cwd(), 'firebase-backup.json');
const COLLECTIONS = ['curriculum', 'curriculum_versions'];

function getAdminApp(isProduction) {
  // If we are connecting to emulator, set the emulator host env var
  if (!isProduction) {
    process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
    process.env.GCLOUD_PROJECT = 'demo-gbstem-curriculum';
  } else {
    // Make sure emulator host env vars are NOT set when connecting to prod
    delete process.env.FIRESTORE_EMULATOR_HOST;
    delete process.env.FIREBASE_AUTH_EMULATOR_HOST;
  }

  // Delete existing apps to avoid "already exists" errors during re-init if any
  for (const app of admin.apps) {
    if (app) app.delete();
  }

  if (isProduction) {
    const projectId =
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId) {
      throw new Error(
        'Missing or invalid production Firebase credentials in .env.local.\n' +
          'Please review the README for more information.'
      );
    }

    if (
      privateKey &&
      privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
      !privateKey.includes('...') &&
      clientEmail
    ) {
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else {
      return admin.initializeApp({
        projectId,
      });
    }
  } else {
    return admin.initializeApp({
      projectId: 'demo-gbstem-curriculum',
    });
  }
}

// Convert serialized Timestamp objects back to admin.firestore.Timestamp objects
function restoreTimestamps(data) {
  if (data === null || data === undefined) return data;
  if (typeof data === 'object') {
    // Handle admin SDK timestamp (with underscores)
    if (typeof data._seconds === 'number' && typeof data._nanoseconds === 'number') {
      return new admin.firestore.Timestamp(data._seconds, data._nanoseconds);
    }
    // Handle client SDK timestamp (without underscores)
    if (typeof data.seconds === 'number' && typeof data.nanoseconds === 'number') {
      return new admin.firestore.Timestamp(data.seconds, data.nanoseconds);
    }
    const result = Array.isArray(data) ? [] : {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = restoreTimestamps(data[key]);
      }
    }
    return result;
  }
  return data;
}

async function pull() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId) {
    throw new Error(
      'Missing production Firebase Project ID in .env.local.\n' +
        'Please ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID or FIREBASE_PROJECT_ID is set.'
    );
  }

  const backupData = {};
  const hasServiceAccount =
    privateKey &&
    privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
    !privateKey.includes('...') &&
    clientEmail;

  if (hasServiceAccount) {
    console.log('Connecting to production Firestore using Service Account (Admin SDK)...');
    const app = getAdminApp(true);
    const db = app.firestore();

    for (const colName of COLLECTIONS) {
      console.log(`Fetching collection "${colName}" from production...`);
      const snapshot = await db.collection(colName).get();
      backupData[colName] = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(`Fetched ${backupData[colName].length} documents from "${colName}".`);
    }
  } else {
    console.log(
      'No production service credentials found. Attempting to pull using Client SDK (unprotected read)...'
    );
    const { initializeApp: initializeClientApp } = require('firebase/app');
    const {
      getFirestore: getClientFirestore,
      collection: getClientCollection,
      getDocs: getClientDocs,
    } = require('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: projectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };

    const clientApp = initializeClientApp(firebaseConfig);
    const clientDb = getClientFirestore(clientApp);

    for (const colName of COLLECTIONS) {
      console.log(`Fetching collection "${colName}" from production using Client SDK...`);
      const q = getClientCollection(clientDb, colName);
      const snapshot = await getClientDocs(q);
      backupData[colName] = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log(`Fetched ${backupData[colName].length} documents from "${colName}".`);
    }
  }

  fs.writeFileSync(BACKUP_FILE, JSON.stringify(backupData, null, 2), 'utf8');
  console.log(`Backup saved successfully to ${BACKUP_FILE}`);
}

async function seed() {
  if (!fs.existsSync(BACKUP_FILE)) {
    throw new Error(`Backup file not found at ${BACKUP_FILE}. Run the pull command first.`);
  }

  console.log('Connecting to Firestore emulator...');
  const app = getAdminApp(false);
  const db = app.firestore();

  const backupData = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));

  for (const colName of COLLECTIONS) {
    const docs = backupData[colName] || [];
    console.log(`Seeding ${docs.length} documents into emulator collection "${colName}"...`);
    for (const docInfo of docs) {
      const docData = restoreTimestamps(docInfo.data);
      await db.collection(colName).doc(docInfo.id).set(docData);
    }
    console.log(`Collection "${colName}" seeded successfully.`);
  }
  console.log('Emulator database seeding completed.');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'pull') {
    await pull();
  } else if (command === 'seed') {
    await seed();
  } else {
    console.error('Invalid command. Usage: node scripts/sync-db.js [pull|seed]');
    process.exit(1);
  }
  // Force exit to avoid hanging due to Firebase Client SDK connections.
  process.exit(0);
}

main().catch((err) => {
  console.error('Error executing script:', err);
  process.exit(1);
});

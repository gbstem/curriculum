import * as admin from 'firebase-admin';
import {
  addDoc,
  query as clientQuery,
  where as clientWhere,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db as clientDb } from './firebase';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Handle escaped newlines in env variables
const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

const hasServiceAccount = !!(
  privateKey &&
  privateKey.includes('-----BEGIN PRIVATE KEY-----') &&
  !privateKey.includes('...') &&
  clientEmail &&
  projectId
);

const isEmulator = !!(
  process.env.FIRESTORE_EMULATOR_HOST || process.env.FIREBASE_AUTH_EMULATOR_HOST
);

// We should only initialize the Admin SDK if we have service credentials or are running under the emulator,
// or if we are running in the test environment (where firebase-admin is mocked).
// TODO(dmeyer246) Remove all the complexity here once we've got all our development
// environments over to using service accounts or the emulator, which will allow removing all
// the wrappers below.
const shouldInitializeAdmin = hasServiceAccount || isEmulator || process.env.NODE_ENV === 'test';

if (shouldInitializeAdmin && !admin.apps.length) {
  try {
    if (hasServiceAccount) {
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

// Convert firebase-admin FieldValue server timestamps to client SDK server timestamps
function convertSentinelValues(data: any): any {
  if (data === null || data === undefined) return data;
  if (typeof data !== 'object') return data;

  // Check if it is a FieldValue object from firebase-admin (e.g. serverTimestamp())
  if (
    data.constructor &&
    (data.constructor.name === 'FieldValue' ||
      (data.toString && data.toString().includes('FieldValue')))
  ) {
    return serverTimestamp();
  }

  const result: any = Array.isArray(data) ? [] : {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      result[key] = convertSentinelValues(data[key]);
    }
  }
  return result;
}

// Lightweight wrapper classes around client SDK to match firebase-admin Firestore API
class ClientQueryWrapper {
  private colName: string;
  private constraints: any[];

  constructor(colName: string, constraints: any[] = []) {
    this.colName = colName;
    this.constraints = constraints;
  }

  where(field: string, op: any, value: any) {
    return new ClientQueryWrapper(this.colName, [
      ...this.constraints,
      clientWhere(field, op, value),
    ]);
  }

  async get() {
    const q = clientQuery(collection(clientDb, this.colName), ...this.constraints);
    const snapshot = await getDocs(q);
    return {
      empty: snapshot.empty,
      docs: snapshot.docs.map((d) => ({
        id: d.id,
        exists: d.exists(),
        data: () => d.data(),
      })),
      forEach(callback: (doc: any) => void) {
        snapshot.docs.forEach((d) => {
          callback({
            id: d.id,
            exists: d.exists(),
            data: () => d.data(),
          });
        });
      },
    };
  }
}

class ClientDocWrapper {
  private colName: string;
  private docId: string;

  constructor(colName: string, docId: string) {
    this.colName = colName;
    this.docId = docId;
  }

  async get() {
    const dRef = doc(clientDb, this.colName, this.docId);
    const snapshot = await getDoc(dRef);
    return {
      id: snapshot.id,
      exists: snapshot.exists(),
      data: () => snapshot.data(),
    };
  }

  async update(data: any) {
    const dRef = doc(clientDb, this.colName, this.docId);
    const cleanData = convertSentinelValues(data);
    await updateDoc(dRef, cleanData);
  }

  async delete() {
    const dRef = doc(clientDb, this.colName, this.docId);
    await deleteDoc(dRef);
  }
}

class ClientCollectionWrapper {
  private colName: string;

  constructor(colName: string) {
    this.colName = colName;
  }

  doc(id: string) {
    return new ClientDocWrapper(this.colName, id);
  }

  where(field: string, op: any, value: any) {
    return new ClientQueryWrapper(this.colName, [clientWhere(field, op, value)]);
  }

  async get() {
    const q = collection(clientDb, this.colName);
    const snapshot = await getDocs(q);
    return {
      empty: snapshot.empty,
      docs: snapshot.docs.map((d) => ({
        id: d.id,
        exists: d.exists(),
        data: () => d.data(),
      })),
      forEach(callback: (doc: any) => void) {
        snapshot.docs.forEach((d) => {
          callback({
            id: d.id,
            exists: d.exists(),
            data: () => d.data(),
          });
        });
      },
    };
  }

  async add(data: any) {
    const cleanData = convertSentinelValues(data);
    const docRef = await addDoc(collection(clientDb, this.colName), cleanData);
    return {
      id: docRef.id,
    };
  }
}

const clientFirestoreMock = {
  collection(colName: string) {
    return new ClientCollectionWrapper(colName);
  },
};

export const adminDb = (shouldInitializeAdmin
  ? admin.firestore()
  : clientFirestoreMock) as unknown as admin.firestore.Firestore;

export const adminAuth = (shouldInitializeAdmin
  ? admin.auth()
  : {
      verifyIdToken: () => {
        throw new Error('Admin Auth is not available without service credentials.');
      },
    }) as unknown as admin.auth.Auth;

export default admin;

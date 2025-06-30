import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firestore
export const db = getFirestore(app);

export default app; 

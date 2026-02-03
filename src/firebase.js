import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJH95aTTNdfduS7MOAuaMxuAAmhNDzReo",
  authDomain: "task-manager-c942c.firebaseapp.com",
  projectId: "task-manager-c942c",
  storageBucket: "task-manager-c942c.firebasestorage.app",
  messagingSenderId: "12841810041",
  appId: "1:12841810041:web:e12db814451b4cd75cfca8",
  measurementId: "G-RG5JCFVV68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable Offline Persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a a time.
    console.log("Persistence failed: Multiple tabs open");
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the features required to enable persistence
    console.log("Persistence failed: Browser not supported");
  }
});
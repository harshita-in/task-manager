import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
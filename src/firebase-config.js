import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDjdlFOp3QfZRjpmw6kCphfTkBTgkLxsvE',
  authDomain: 'where-s-waldo-aab39.firebaseapp.com',
  projectId: 'where-s-waldo-aab39',
  storageBucket: 'where-s-waldo-aab39.appspot.com',
  messagingSenderId: '837506775247',
  appId: '1:837506775247:web:0ab41111bc40febc055fba',
  measurementId: 'G-VX280L9M01'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

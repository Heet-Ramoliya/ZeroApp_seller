import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBn5srogdxncWOC6hSjL8uXXD5FDMHXyRg',
  authDomain: 'zeroapp-66e9a.firebaseapp.com',
  projectId: 'zeroapp-66e9a',
  storageBucket: 'zeroapp-66e9a.appspot.com',
  messagingSenderId: '889213330077',
  appId: '1:889213330077:web:3a4e1782d962a10ebeea74',
  measurementId: 'G-NHYQYG5978',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

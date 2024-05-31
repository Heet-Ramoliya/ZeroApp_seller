import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDatabase} from 'firebase/database';

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
export const RealTimeDatabase = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// src/services/firebase.js
import {initializeApp, getApps} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBZB0sYfoHJKAskqtsSBBx-Zv_bCuSOBfk',
  authDomain: 'nativtodoapp.firebaseapp.com',
  projectId: 'nativtodoapp',
  storageBucket: 'nativtodoapp.firebasestorage.app',
  messagingSenderId: '843127197153',
  appId: '1:843127197153:web:d14f391a1d6d085c9296a0',
};

const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);

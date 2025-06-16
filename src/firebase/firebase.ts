import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

//  Clés en dur (seulement temporairement pour le dev local)
const firebaseConfig = {
  apiKey: 'AIzaSyBZB0sYfoHJKAskqtsSBBx-Zv_bCuSOBfk',
  authDomain: 'nativtodoapp.firebaseapp.com',
  projectId: 'nativtodoapp',
  storageBucket: 'nativtodoapp.appspot.com',
  messagingSenderId: '843127197153',
  appId: '1:843127197153:web:d14f391a1d6d085c9296a0',
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

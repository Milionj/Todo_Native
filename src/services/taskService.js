import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase/config';

export const fetchTasks = async () => {
  const snapshot = await getDocs(collection(db, 'tasks'));
  return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
};

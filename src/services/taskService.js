import {db} from './firebaseConfig'; // Connexion Firebase
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';

// Fonction pour récupérer toutes les tâches depuis Firestore
export const fetchTasks = async () => {
  const snapshot = await getDocs(collection(db, 'tasks')); // Lecture de la collection "tasks"
  return snapshot.docs.map(document => ({
    id: document.id,
    ...document.data(),
  })); // On retourne un tableau avec id + données
};

// Fonction pour ajouter une tâche dans Firestore
export const addTask = async title => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    title, // Titre de la tâche
    completed: false, // Statut par défaut : non complétée
    createdAt: serverTimestamp(), // Date de création générée par Firebase
  });
  return {id: docRef.id, title, completed: false}; // Retourne la tâche créée (pour mise à jour locale)
};

// Fonction pour supprimer une tâche
export const deleteTask = async id => {
  await deleteDoc(doc(db, 'tasks', id)); // Supprime le document avec l'ID donné
};

// Fonction pour basculer le statut de complétion d'une tâche
export const toggleComplete = async id => {
  const taskRef = doc(db, 'tasks', id); // Référence au document
  const snapshot = await getDoc(taskRef); // On récupère le contenu actuel
  const currentStatus = snapshot.data().completed; // On lit l'état actuel
  await updateDoc(taskRef, {completed: !currentStatus}); // On inverse le statut
};

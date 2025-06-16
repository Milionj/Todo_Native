// src/services/taskService.ts

import {db} from '../firebase/firebase'; // Connexion à Firestore
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

//  Typage des tâches utilisées dans l'app
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: Date;
};

//  Fonction pour récupérer toutes les tâches
export const fetchTasks = async (): Promise<Task[]> => {
  const snapshot = await getDocs(collection(db, 'tasks'));

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Task, 'id'>), // On récupère toutes les données sauf l'id, qu'on remet à la main
  }));
};

//  Fonction pour ajouter une nouvelle tâche
export const addTask = async (title: string): Promise<Task> => {
  const docRef = await addDoc(collection(db, 'tasks'), {
    title,
    completed: false,
    createdAt: serverTimestamp(), // Timestamp Firestore
  });

  return {
    id: docRef.id,
    title,
    completed: false,
  };
};

//  Fonction pour supprimer une tâche par son id
export const deleteTask = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'tasks', id));
};

//  Fonction pour inverser l'état "complété" d'une tâche
export const toggleComplete = async (id: string): Promise<void> => {
  const taskRef = doc(db, 'tasks', id); // Référence au document
  const snapshot = await getDoc(taskRef);
  const currentStatus = snapshot.data()?.completed;

  await updateDoc(taskRef, {
    completed: !currentStatus, // Inversion de l'état
  });
};

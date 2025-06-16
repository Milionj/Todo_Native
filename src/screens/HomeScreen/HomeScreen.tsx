// src/screens/HomeScreen/HomeScreen.tsx

import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import TaskItem from '../../components/TaskItem/TaskItem'; // Composant réutilisable pour afficher une tâche
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleComplete,
  Task, // Type de la structure d'une tâche
} from '../../services/taskService';

const HomeScreen: React.FC = () => {
  //  État pour stocker les tâches récupérées depuis Firestore
  const [tasks, setTasks] = useState<Task[]>([]);

  //  État pour le texte entré dans l’input
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  //  Fonction pour charger les tâches depuis Firestore au lancement
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  //  Ajouter une tâche à Firestore
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return; // On empêche d’ajouter une tâche vide

    const newTask = await addTask(newTaskTitle.trim()); // Ajout dans Firebase
    setTasks([...tasks, newTask]); // Mise à jour immédiate dans l'interface
    setNewTaskTitle(''); // Réinitialise l’input
  };

  //  Supprimer une tâche selon son id
  const handleDeleteTask = async (id: string) => {
    await deleteTask(id); // Supprime de Firestore
    setTasks(tasks.filter(task => task.id !== id)); // Supprime localement
  };

  //  Basculer entre "complété" et "non complété"
  const handleToggleComplete = async (id: string) => {
    await toggleComplete(id);
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  //  Au premier affichage de l'écran, on charge les données
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      {/*  Input pour saisir une nouvelle tâche */}
      <TextInput
        placeholder="Nouvelle tâche"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        style={styles.input}
      />

      {/*  Bouton pour ajouter une tâche */}
      <Button title="Ajouter" onPress={handleAddTask} />

      {/*  Affichage des tâches sous forme de liste */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onDelete={() => handleDeleteTask(item.id)}
            onToggleComplete={() => handleToggleComplete(item.id)}
          />
        )}
        ListEmptyComponent={<Text>Aucune tâche pour le moment.</Text>}
      />
    </View>
  );
};

//  Styles séparés pour une meilleure lisibilité
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;

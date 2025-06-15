import React, {useEffect, useState} from 'react';
import {View, TextInput, Button, FlatList} from 'react-native';
import TaskItem from '../../components/TaskItem/TaskItem'; // Composant d'affichage d'une tâche
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleComplete,
} from '../../services/taskService'; // Fonctions Firebase

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]); // Liste des tâches affichées
  const [newTaskTitle, setNewTaskTitle] = useState(''); // Titre de la nouvelle tâche à créer

  // Chargement des tâches à l'ouverture de l'écran
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data); // Mise à jour du state avec les tâches récupérées
  };

  // Ajout d'une tâche via le champ texte
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      return; // On évite d’ajouter une tâche vide
    }
    const newTask = await addTask(newTaskTitle.trim()); // On ajoute via Firebase
    setTasks([...tasks, newTask]); // Mise à jour locale de la liste
    setNewTaskTitle(''); // On vide le champ texte
  };

  // Suppression d'une tâche
  const handleDeleteTask = async id => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t.id !== id)); // On retire la tâche localement
  };

  // Marquer une tâche comme complétée / non complétée
  const handleToggleComplete = async id => {
    await toggleComplete(id);
    setTasks(
      tasks.map(t => (t.id === id ? {...t, completed: !t.completed} : t)),
    );
  };

  // Chargement initial au montage du composant
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View>
      {/* Champ texte pour saisir une nouvelle tâche */}
      <TextInput
        placeholder="Nouvelle tâche"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />

      {/* Bouton pour ajouter la tâche */}
      <Button title="Ajouter" onPress={handleAddTask} />

      {/* Liste des tâches avec FlatList */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id} // Clé unique pour chaque tâche
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onDelete={() => handleDeleteTask(item.id)} // Suppression
            onToggleComplete={() => handleToggleComplete(item.id)} // Commutation du statut
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

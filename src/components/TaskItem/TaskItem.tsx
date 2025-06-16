// src/components/TaskItem/TaskItem.tsx

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// ✅ Type représentant une tâche (structure d'une tâche)
type Task = {
  id: string;
  title: string;
  completed: boolean;
};

// ✅ Type des props attendues par TaskItem
type Props = {
  task: Task; // La tâche à afficher
  onDelete: () => void; // Fonction déclenchée lors d'un clic sur "Supprimer"
  onToggleComplete: () => void; // Fonction déclenchée lors du clic pour cocher/décocher
};

// ✅ Composant fonctionnel qui reçoit une tâche en prop
const TaskItem: React.FC<Props> = ({task, onDelete, onToggleComplete}) => {
  return (
    <View style={styles.container}>
      {/* ✅ Clic pour cocher ou décocher une tâche */}
      <TouchableOpacity onPress={onToggleComplete}>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.completedText, // Si la tâche est complétée, applique un style barré
          ]}>
          {task.title}
        </Text>
      </TouchableOpacity>

      {/* ✅ Bouton pour supprimer la tâche */}
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ Définition des styles réutilisables
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Place les éléments côte à côte
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
    color: 'black',
  },
  completedText: {
    textDecorationLine: 'line-through', // Barre le texte
    color: 'gray',
  },
  deleteText: {
    color: 'red',
  },
});

export default TaskItem;

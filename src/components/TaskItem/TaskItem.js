// src/components/TaskItem.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

// Composant qui reçoit une tâche et deux callbacks : onDelete, onToggleComplete
const TaskItem = ({task, onDelete, onToggleComplete}) => {
  return (
    <View>
      {/* Clique sur le texte pour marquer comme complétée */}
      <TouchableOpacity onPress={onToggleComplete}>
        <Text>
          {task.completed ? '[✔] ' : '[ ] '}
          {task.title}
        </Text>
      </TouchableOpacity>

      {/* Bouton de suppression de la tâche */}
      <TouchableOpacity onPress={onDelete}>
        <Text>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;

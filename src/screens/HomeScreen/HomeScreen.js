import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import TaskItem from '../../components/TaskItem/TaskItem';
import {fetchTasks} from '../../services/taskService';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Tâches</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => <TaskItem task={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
});

export default HomeScreen;

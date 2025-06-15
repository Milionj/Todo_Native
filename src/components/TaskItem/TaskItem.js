import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TaskItem = ({task}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{task.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default TaskItem;

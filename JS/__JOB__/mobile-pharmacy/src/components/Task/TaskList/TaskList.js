import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { AppHeader } from '../../UI/AppHeader'
import { TaskListItem } from './TaskListItem/TaskListItem'


export const TaskList = ({ tasks, taskPressHandler, isCompleted = false }) => {
  return (
    <View style={styles.taskListContainer}>
      <AppHeader>
        { isCompleted ? 'Выполненные' : 'Текущие' } задания
      </AppHeader>

      <FlatList
        data={ tasks }
        keyExtractor={ task => task.documentID }
        renderItem={ ({ item }) => (
          <TaskListItem task={ item } isCompleted={ isCompleted } onPress={ () => taskPressHandler(item.documentID) }/>
        ) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  taskListContainer: {
    width: '100%'
  }
})



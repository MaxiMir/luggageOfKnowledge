import React from 'react'
import { View, FlatList } from 'react-native'

import { AppHeader } from '../../UI/AppHeader'
import { TaskListItem } from './TaskListItem/TaskListItem'


export const TaskList = ({ tasks, taskPressHandler }) => {
  return (
    <View>
      <AppHeader>
        Текущие задания
      </AppHeader>

      <FlatList
        data={tasks}
        keyExtractor={task => task.documentID}
        renderItem={({item}) => <TaskListItem task={item} onPress={() => taskPressHandler(item.documentID)} />}
      />
    </View>
  )
}

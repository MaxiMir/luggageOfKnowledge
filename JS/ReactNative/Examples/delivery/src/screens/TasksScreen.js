import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader';
import { getAllTasks } from '../store/actions/task';
import { TaskList } from '../components/Task/TaskList/TaskList';
import { AppTextBold } from '../components/UI/AppTextBold';
import { AppButton } from '../components/UI/AppButton';
import { THEME } from '../theme';


export const TasksScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task.all)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  const taskPressHandler = documentID => {
    navigation.navigate('Task', {
      documentID,
      isNewTask: false
    })
  }

  const scanBtnHandler = () => navigation.navigate('Photo')

  if (!tasks) {
    return (
      <AppContainer>
        <AppLoader
          text='Получаю список Ваших задач...'
        />
      </AppContainer>
    )
  }

  const content = tasks.length ?
    <TaskList
      tasks={tasks}
      taskPressHandler={taskPressHandler}
    />
    :
    <View style={styles.noTaskContainer}>
      <AppTextBold style={styles.noTaskText}>
        Список задач пуст
      </AppTextBold>
      <AppButton onPress={scanBtnHandler}>
        Сканировать шрихкод
      </AppButton>
    </View>


  return (
    <AppContainer>
      { content }
    </AppContainer>
  )
}

TasksScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Задания'
})

const styles = StyleSheet.create({
  noTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noTaskText: {
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

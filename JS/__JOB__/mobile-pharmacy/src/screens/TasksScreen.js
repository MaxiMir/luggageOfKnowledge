import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppButton } from '../components/UI/AppButton'
import { TaskList } from '../components/Task/TaskList/TaskList'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const TasksScreen = ({ navigation }) => {
  const tasks = useSelector(state => state.task.accepted)

  if (!tasks) {
    return (
      <AppContainer>
        <AppLoader text='Получаю список Ваших задач...' />
      </AppContainer>
    )
  }

  const taskPressHandler = id => {
    navigation.navigate(SCREEN.TASK, { id, isNewTask: false, isCompletedTask: false })
  }

  const content = tasks.length ?
    <TaskList tasks={ tasks } taskPressHandler={ taskPressHandler } />
    :
    <View style={ styles.noTaskContainer }>
      <AppTextBold style={ styles.noTaskText }>
        Список задач пуст
      </AppTextBold>

      <AppButton onPress={ () => navigation.navigate(SCREEN.SCAN) }>
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

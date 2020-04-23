import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppButton } from '../components/UI/AppButton'
import { TaskList } from '../components/Task/TaskList/TaskList'
import { getTaskHistory } from '../store/actions/task'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const HistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const completedTasks = useSelector(state => state.task.completed)

  useEffect(() => {
    dispatch(getTaskHistory())
  }, [dispatch])

  const taskPressHandler = documentID => {
    navigation.navigate(SCREEN.TASK, {
      documentID,
      isNewTask: false,
      isCompletedTask: true
    })
  }

  const scanBtnHandler = () => navigation.navigate(SCREEN.SCAN)

  if (!completedTasks) {
    return (
      <AppContainer>
        <AppLoader
          text='Получаю историю Ваших задач...'
        />
      </AppContainer>
    )
  }

  const content = completedTasks.length ?
    <TaskList
      tasks={ completedTasks }
      taskPressHandler={ taskPressHandler }
      isCompleted={true}
    />
    :
    <View style={ styles.noTaskContainer }>
      <AppTextBold style={ styles.noHistoryText }>
        Список выполненных задач пуст
      </AppTextBold>
      <AppButton onPress={ scanBtnHandler }>
        Сканировать шрихкод
      </AppButton>
    </View>


  return (
    <AppContainer>
      { content }
    </AppContainer>
  )
}

HistoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'История'
})


const styles = StyleSheet.create({
  noTaskContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noHistoryText: {
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

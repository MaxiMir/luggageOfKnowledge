import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText'
import { AppLoader } from '../components/UI/AppLoader';
import { getAllTasks } from '../store/actions/task';


export const TasksScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.task.all)

  useEffect(() => {
    dispatch(getAllTasks())
  }, [dispatch])

  if (!tasks) {
    return (
      <AppContainer>
        <AppLoader
          text='Получаю список Ваших задач...'
        />
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <AppText>
        { tasks.length }
      </AppText>
    </AppContainer>
  )
}

TasksScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Задания'
})

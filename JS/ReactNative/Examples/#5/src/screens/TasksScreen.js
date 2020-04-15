import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText'

export const TasksScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        TasksScreen
      </AppText>
    </AppContainer>
  )
}

TasksScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Задания'
})

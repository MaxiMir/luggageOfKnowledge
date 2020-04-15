import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText'

export const TaskCompleteScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        TaskCompletionScreen
      </AppText>
    </AppContainer>
  )
}

TaskCompleteScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Завершение задание'
})

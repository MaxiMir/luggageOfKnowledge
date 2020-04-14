import React from 'react'

import { AppContainer } from '../components/ui/AppContainer'
import { AppText } from '../components/ui/AppText'

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

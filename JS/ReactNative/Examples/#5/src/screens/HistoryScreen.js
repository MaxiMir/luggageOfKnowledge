import React from 'react'

import { AppContainer } from '../components/ui/AppContainer'
import { AppText } from '../components/ui/AppText';


export const HistoryScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        HistoryScreen
      </AppText>
    </AppContainer>
  )
}

HistoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'История'
})

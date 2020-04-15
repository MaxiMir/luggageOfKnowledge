import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText';


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

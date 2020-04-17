import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText';
import { AppButton } from '../components/UI/AppButton';


export const HistoryScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        HistoryScreen
      </AppText>
      <AppButton onPress={() => navigation.navigate('Task')}>
        На заказ
      </AppButton>
    </AppContainer>
  )
}

HistoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'История'
})

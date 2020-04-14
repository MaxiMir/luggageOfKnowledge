import React from 'react'

import { AppContainer } from '../components/ui/AppContainer'
import { AppText } from '../components/ui/AppText'

export const ProfileScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        ProfileScreen
      </AppText>
    </AppContainer>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Профиль'
})

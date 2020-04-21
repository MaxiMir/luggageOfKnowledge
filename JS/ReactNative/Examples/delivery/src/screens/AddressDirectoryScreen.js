import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppText } from '../components/UI/AppText'


export const AddressDirectoryScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppHeader>
        Справочник адресов
      </AppHeader>
      <AppText>
        Логика тут
      </AppText>
    </AppContainer>
  )
}

AddressDirectoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Справочник адресов'
})

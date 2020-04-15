import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { AppText } from '../components/UI/AppText';


export const AddressDirectoryScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppText>
        AddressDirectory
      </AppText>
    </AppContainer>
  )
}

AddressDirectoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Справочник адресов'
})

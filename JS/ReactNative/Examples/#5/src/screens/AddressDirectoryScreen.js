import React from 'react'

import { AppContainer } from '../components/ui/AppContainer'
import { AppText } from '../components/ui/AppText';


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

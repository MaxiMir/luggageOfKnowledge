import React from 'react'

import { AppContainer } from '../components/UI/AppContainer'
import { User } from '../components/User/User'

export const ProfileScreen = ({ navigation }) => {
  const user = {
    fullName: 'Прохоров Семен Семеныч',
    post: 'Провизор',
    phone: '+7 (920) 777-77-77',
    image: '../../../../assets/mock/mockAvatar.png'
  }

  return (
    <AppContainer>
      <User
        user={ user }
      />
    </AppContainer>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Профиль'
})

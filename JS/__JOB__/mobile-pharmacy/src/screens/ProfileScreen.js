import React from 'react'

import { AppContainer } from '../hoc/AppContainer'
import { User } from '../components/User/User'
import { AppButton } from '../components/UI/AppButton'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


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
      <AppButton
        color={THEME.DANGER_COLOR}
        onPress={() => navigation.navigate(SCREEN.LOGOUT)}
        style={{marginTop: 20}}
      >
        Выйти
      </AppButton>
    </AppContainer>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Профиль'
})

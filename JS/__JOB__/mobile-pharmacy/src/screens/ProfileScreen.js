import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { AppContainer } from '../hoc/AppContainer'
import { AppButton } from '../components/UI/AppButton'
import { User } from '../components/User/User'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const ProfileScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.data)

  return (
    <AppContainer>
      <User user={ user }/>

      <AppButton
        color={ THEME.DANGER_COLOR }
        onPress={ () => navigation.navigate(SCREEN.LOGOUT) }
        style={ styles.logoutBtn }
      >
        Выйти
      </AppButton>
    </AppContainer>
  )
}

ProfileScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Профиль'
})

const styles = StyleSheet.create({
  logoutBtn: {
    marginTop: 20
  }
})

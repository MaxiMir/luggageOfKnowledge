import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { AppContainer } from '../components/UI/AppContainer'
import { AppButton } from '../components/UI/AppButton'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const MainScreen = ({ navigation }) => {
  return (
    <AppContainer style={ styles.container }>
      <Image
        source={ require('../../assets/logo-min.png') }
        style={ styles.image }
      />
      <View style={ styles.buttonsContainer }>
        <AppButton onPress={ () => navigation.navigate(SCREEN.HOW_TO_USE) }>
          Как использовать приложение
        </AppButton>

        <AppButton onPress={ () => navigation.navigate(SCREEN.ADDRESS_DIRECTORY) }>
          Справочник адресов
        </AppButton>
      </View>

      <AppButton
        color={THEME.DANGER_COLOR}
        onPress={ () => navigation.navigate(SCREEN.TASK, {
        documentID: Date.now().toString(),
        isNewTask: true
        }) }
      >
        DEBUG
      </AppButton>
    </AppContainer>
  )
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Главная'
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    height: 90,
    justifyContent: 'space-between',
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

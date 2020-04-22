import React, { useState } from "react"
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { AppContainer } from '../components/UI/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { THEME } from '../theme'


export const AuthScreen = ({ navigation }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const isDisableEnterBtn = false // login.trim().length < 11 || password.trim().length < 6

  return (
    <AppContainer>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={styles.container}>
          <AppHeader>
            Авторизация
          </AppHeader>
          <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Номер телефона"
                value={ login }
                onChangeText={ setLogin }
                autoCorrect = {false}
                onSubmitEditing ={Keyboard.dismiss}
                keyboardType = "number-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Пароль"
                value={ password }
                onChangeText={ setPassword }
                autoCorrect = {false}
                autoCapitalize='none'
                onSubmitEditing ={Keyboard.dismiss}
              />
            </View>
            <View style={styles.buttonContainer}>
              <AppButton
                onPress={() => {}}
                disabled={isDisableEnterBtn}
              >
                Войти
              </AppButton>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AppContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center'
  },
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 40
  },
  inputContainer: {
    padding: THEME.PADDING / 2,
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonContainer: {

  }
})

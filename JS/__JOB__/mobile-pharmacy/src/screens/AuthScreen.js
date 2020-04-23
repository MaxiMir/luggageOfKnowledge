import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { AppContainer } from '../hoc/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { AppLoader } from '../components/UI/AppLoader'
import { auth } from '../store/actions/user'
import { SETTINGS } from '../consts'
import { THEME } from '../theme'

export const AuthScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('79991234567')
  const [password, setPassword] = useState('123456')
  const [isSendingData, setIsSendingData] = useState(false)

  const isInvalidPhone = () => {
    return phone.length !== SETTINGS.PHONE_LENGTH
  }

  const isInvalidPassword = () => {
    return password.length < SETTINGS.PASSWORD_MIN_LENGTH
  }

  const enterBtnHandler = () => {
    setIsSendingData(true)
    dispatch(auth(phone, password))
    setIsSendingData(false)
  }

  const isDisableEnterBtn = isInvalidPhone() || isInvalidPassword()

  if (isSendingData) {
    return (
      <AppContainer>
        <AppLoader
          text='Отправляю данные...'
        />
      </AppContainer>
    )
  }


  return (
    <AppContainer>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ styles.container }>
          <AppHeader>
            Авторизация
          </AppHeader>
          <View style={ styles.inputsContainer }>
            <View style={ styles.inputContainer }>
              <TextInput
                placeholder="Номер телефона"
                value={ phone }
                onChangeText={ setPhone }
                autoCorrect={ false }
                onSubmitEditing={ Keyboard.dismiss }
                keyboardType="numeric"
                maxLength={11}
              />
            </View>
            <View style={ styles.inputContainer }>
              <TextInput
                placeholder="Пароль"
                value={ password }
                onChangeText={ setPassword }
                autoCorrect={ false }
                autoCapitalize='none'
                secureTextEntry={ true }
                onSubmitEditing={ Keyboard.dismiss }
              />
            </View>
            <View style={ styles.buttonContainer }>
              <AppButton
                onPress={ enterBtnHandler }
                disabled={ isDisableEnterBtn }
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
    paddingHorizontal: 60
  },
  inputContainer: {
    padding: THEME.PADDING / 2,
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: THEME.MARGIN_BOTTOM
  }
})


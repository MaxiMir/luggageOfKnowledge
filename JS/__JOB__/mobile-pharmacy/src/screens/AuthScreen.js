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
  const formInitialState = { phone: '+7', password: '' }
  const [form, setForm] = useState(formInitialState)
  const [isSendingData, setIsSendingData] = useState(false)

  if (isSendingData) {
    return (
      <AppContainer>
        <AppLoader text='Отправляю данные...'/>
      </AppContainer>
    )
  }

  const changeInputHandler = formNewData => {
    setForm({ ...form, ...formNewData })
  }

  const checkOnValidPhone = () => {
    const phoneWithoutPlus = String(+form.phone)
    return phoneWithoutPlus.length === SETTINGS.PHONE_LENGTH
  }

  const checkOnValidPassword = () => {
    return form.password.length >= SETTINGS.PASSWORD_MIN_LENGTH
  }

  const enterBtnHandler = () => {
    const phoneWithoutPlus = String(+form.phone)

    setIsSendingData(true)

    dispatch(auth(phoneWithoutPlus, form.password))

    setIsSendingData(false)
  }

  const isValidPhone = checkOnValidPhone()
  const isValidPassword = checkOnValidPassword()
  const phoneContainerColor = isValidPhone ? THEME.SUCCESS_COLOR : THEME.MAIN_COLOR
  const passwordContainerColor = isValidPassword ? THEME.SUCCESS_COLOR : THEME.MAIN_COLOR
  const isDisableEnterBtn = !isValidPhone || !isValidPassword || isSendingData

  return (
    <AppContainer>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ styles.container }>
          <AppHeader>Авторизация</AppHeader>

          <View style={ styles.inputsContainer }>
            <View style={ { ...styles.inputContainer, borderColor: phoneContainerColor } }>
              <TextInput
                placeholder="НОМЕР ТЕЛЕФОНА"
                value={ form.phone }
                onChangeText={ phone => changeInputHandler({ phone }) }
                autoCorrect={ false }
                onSubmitEditing={ Keyboard.dismiss }
                keyboardType="numeric"
                maxLength={ !form.phone.startsWith('+') ? 11 : 12 }
              />
            </View>

            <View style={ { ...styles.inputContainer, borderColor: passwordContainerColor } }>
              <TextInput
                placeholder="ПАРОЛЬ"
                value={ form.password }
                onChangeText={ password => changeInputHandler({ password }) }
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
    justifyContent: 'center',
    backgroundColor: THEME.BACKGROUND_COLOR
  },
  inputsContainer: {
    paddingHorizontal: 60
  },
  inputContainer: {
    padding: THEME.PADDING,
    backgroundColor: THEME.WHITE_COLOR,
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: THEME.MARGIN_BOTTOM
  }
})


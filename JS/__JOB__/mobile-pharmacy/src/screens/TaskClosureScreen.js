import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'

import { AppContainer } from '../hoc/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppText } from '../components/UI/AppText'
import { setTaskCompleted } from '../store/actions/task'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const TaskClosureScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const { documentID, pharmacyRecipient } = navigation.getParam('task')

  const cancelBtnHandler = () => {
    navigation.navigate(SCREEN.TASKS)
  }

  const acceptBtnHandler = () => {
    dispatch(setTaskCompleted())
    navigation.navigate(SCREEN.TASKS)
  }

  return (
    <AppContainer>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ styles.container }>
          <AppHeader>
            Завершение задачи на перемещение
          </AppHeader>

          <View style={ styles.textBlock }>
            <AppTextBold>
              Адрес отгрузки:
            </AppTextBold>
            <AppText>
              { pharmacyRecipient }
            </AppText>
          </View>

          <View style={ styles.textBlock }>
            <AppTextBold>
              Ф.И.О:
            </AppTextBold>
            <AppText>

            </AppText>
          </View>

          <View style={ styles.textBlock }>
            <TextInput
              style={ styles.textarea }
              placeholder='Комментарий (необязательно)'
              value={ comment }
              onChangeText={ setComment }
              multiline
            />
          </View>

          <View style={ styles.buttonsContainer }>
            <AppButton
              onPress={ cancelBtnHandler }
              color={ THEME.DANGER_COLOR }
            >
              Отменить
            </AppButton>
            <AppButton
              onPress={ () => acceptBtnHandler(comment) }
              color={ THEME.SUCCESS_COLOR }
            >
              Подтвердить
            </AppButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </AppContainer>
  )
}

TaskClosureScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Завершение задания'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    width: '100%',
    padding: THEME.PADDING,
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})


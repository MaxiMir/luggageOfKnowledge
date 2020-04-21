import React from 'react'
import { View, StyleSheet } from 'react-native'


import { AppContainer } from '../components/UI/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppText } from '../components/UI/AppText'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const TaskClosureScreen = ({ navigation }) => {
  const { documentID, pharmacyRecipient } = navigation.getParam('task')

  const cancelBtnHandler = () => {
    navigation.navigate(SCREEN.TASKS)
  }

  const acceptBtnHandler = () => {
    navigation.navigate(SCREEN.TASKS)
  }

  return (
    <AppContainer>
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
          Козлова Ольга Федоровна
        </AppText>
      </View>
      <View style={ styles.buttonsContainer }>
        <AppButton onPress={ cancelBtnHandler }>
          Отменить
        </AppButton>
        <AppButton onPress={ acceptBtnHandler }>
          Подтвердить
        </AppButton>
      </View>

    </AppContainer>
  )
}

TaskClosureScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Завершение задания'
})

const styles = StyleSheet.create({
  textBlock: {
    width: '100%',
    padding: THEME.PADDING,
    borderWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})


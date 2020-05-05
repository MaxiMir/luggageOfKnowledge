import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native'

import { AppContainer } from '../hoc/AppContainer'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { AppTextBold } from '../components/UI/AppTextBold'
import { AppText } from '../components/UI/AppText'
import { PharmacySelectModal } from '../components/Pharmacy/PharmacySelectModal/PharmacySelectModal'
import { setTaskCompleted } from '../store/actions/task'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const TaskClosureScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { id, destination_store_id, destination_store } = navigation.getParam('task')
  const formInitialState = { comment: '', address: destination_store, destinationStoreId: destination_store_id }
  const modalInitialState = { isVisible: false, isInitialized: false }
  const [form, setForm] = useState(formInitialState)
  const [modalState, setModalState] = useState(modalInitialState)
  const { name } = useSelector(state => state.user.data)

  const changeFormHandler = formNewValues => {
    setForm({ ...form, ...formNewValues })
  }

  const changeModalHandler = modalNewValues => {
    setModalState({ ...modalState, ...modalNewValues })
  }

  const changePharmacy = () => {
    if (!modalState.isInitialized) {
      changeModalHandler({ isInitialized: true })
    }

    changeModalHandler({ isVisible: true })
  }

  const onSelectPharmacy = (destinationStoreId, address) => {
    changeFormHandler({ address, destinationStoreId })
    changeModalHandler({ isVisible: false })
  }

  const acceptBtnHandler = () => {
    dispatch(setTaskCompleted(id, form.destinationStoreId, form.comment))
    navigation.navigate(SCREEN.TASKS)
  }

  const cancelBtnHandler = () => {
    navigation.navigate(SCREEN.TASKS)
  }

  const modalContent = !modalState.isInitialized ?
    null
    :
    <PharmacySelectModal
      visible={ modalState.isVisible }
      onClose={ () => changeModalHandler({ isVisible: false }) }
      onSelect={ onSelectPharmacy }
    />


  return (
    <AppContainer>
      <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
        <View style={ styles.container }>
          <AppHeader>Завершение задачи на перемещение</AppHeader>

          { modalContent }

          <View style={ styles.textBlock }>
            <AppTextBold>Адрес отгрузки: </AppTextBold>
            <AppText style={ styles.destinationText }>{ form.address }</AppText>
            <AppButton onPress={ changePharmacy }>
              <AppTextBold>Изменить</AppTextBold>
            </AppButton>
          </View>

          <View style={ styles.textBlock }>
            <AppTextBold>Ф.И.О: </AppTextBold>
            <AppText>{ name }</AppText>
          </View>

          <View style={ styles.textBlock }>
            <TextInput
              style={ styles.textarea }
              placeholder='Комментарий (необязательно)'
              value={ form.comment }
              onChangeText={ comment => changeFormHandler({ comment }) }
              multiline
            />
          </View>

          <View style={ styles.buttonsContainer }>
            <AppButton onPress={ cancelBtnHandler } color={ THEME.DANGER_COLOR }>
              Отменить
            </AppButton>

            <AppButton onPress={ acceptBtnHandler } color={ THEME.SUCCESS_COLOR }>
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
  destinationText: {
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})


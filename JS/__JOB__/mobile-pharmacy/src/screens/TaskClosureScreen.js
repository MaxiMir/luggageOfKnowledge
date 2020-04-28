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
  const [comment, setComment] = useState('')
  const [address, setAddress] = useState(destination_store)
  const [destinationStoreId, setDestinationStoreId] = useState(destination_store_id)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalIsInitialized, setModalIsInitialized] = useState(false)
  const { name } = useSelector(state => state.user.data)

  const changePharmacy = () => {
    if (!modalIsInitialized) {
      setModalIsInitialized(true)
    }

    setModalVisible(true)
  }

  const onSelectPharmacy = () => {
    setAddress(address)
    setDestinationStoreId(destinationStoreId)
    setModalVisible(false)
  }

  const acceptBtnHandler = () => {
    dispatch(setTaskCompleted(id, destinationStoreId, comment))
    navigation.navigate(SCREEN.TASKS)
  }

  const cancelBtnHandler = () => {
    navigation.navigate(SCREEN.TASKS)
  }

  const modalContent = !modalIsInitialized ?
    null
    :
    <PharmacySelectModal
      visible={ modalVisible }
      onClose={ () => setModalVisible(false) }
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

            <AppText style={ styles.destinationText }>{ address }</AppText>

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
              onPress={ acceptBtnHandler }
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
  destinationText: {
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})


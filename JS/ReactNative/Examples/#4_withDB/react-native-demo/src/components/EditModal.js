import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Modal, Alert } from 'react-native'

import { AppButton } from './ui/AppButton'
import { THEME } from '../theme'


export const EditModal = ({ visible, value, onSave, onCancel }) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length > 3) {
      onSave(title)
      return
    }

    Alert.alert('Ошибка!', `Минимальная длина названия 3 символа.`)
  }

  const cancelHandler = () => {
    setTitle(value) // записываем в state изначальное значение
    onCancel()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          placeholder="Введите название"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
          style={styles.input}
          onChangeText={setTitle}
        />
        <View style={styles.buttons}>
          <AppButton
            onPress={cancelHandler}
            color={THEME.DANGER_COLOR}
          >
            Отменить
          </AppButton>
          <AppButton
            onPress={saveHandler}
          >
            Сохранить
          </AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1, // высота по всему окну
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

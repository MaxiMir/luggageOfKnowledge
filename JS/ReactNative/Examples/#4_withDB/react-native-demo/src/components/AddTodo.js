import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (!value.trim()) {
      Alert.alert('Название Todo не может быть пустым') // показывает всплывашку с сообщением
      return
    }

    onSubmit(value)
    setValue('') // очищаем input
    Keyboard.dismiss() // скрывает клавиатуру
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder="Введите название дела..."
        autoCorrect={false}
        autoCapitalize='none'
      />

      <AntDesign.Button onPress={pressHandler} name="pluscircleo">
        Добавить
      </AntDesign.Button>

    </View>
  )

  // Keyboard - класс для управления клавиатурой

  // onChangeText={setValue} <->/ onChangeText={text => setValue(text)}
  // onChangeText - изменение текста в инпуте (здесь еще меняем локальный state)
  // onPress <-> onClick - в вебе
  // autoCorrect - настройка автозамены в словах
  // autoCapitalize - настройка вверхнего регистра (characteres - все символы | words - каждая буква в каждом слове | sentences - первая буква в предложении (по умолч.) | none - все в маленьком регистре)
  // keyboardType - тип клавиатуры

  // AntDesign.Button - кнопка с иконкой | pluscircleo - название иконки
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    marginRight: 10,
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})

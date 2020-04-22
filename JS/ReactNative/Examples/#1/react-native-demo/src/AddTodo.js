import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    if (!value.trim()) {
      Alert.alert('Название Todo не может быть пустым') // показывает всплывашку с сообщением
      return
    }

    onSubmit(value)
    setValue('') // очищаем input
  }

  return (
    <View style={ styles.block }>
      <TextInput
        style={ styles.input }
        onChangeText={ setValue }
        value={ value }
        placeholder="Введите название дела..."
        autoCorrect={ false }
        autoCapitalize='none'
      />
      <Button title="Добавить" onPress={ pressHandler }/>
    </View>
  )

  // onChangeText={setValue} <->/ onChangeText={text => setValue(text)}
  // onChangeText - изменение текста в инпуте (здесь еще меняем локальный state)
  // onPress <-> onClick - в вебе
  // autoCorrect - настройка автозамены в словах
  // autoCapitalize - настройка вверхнего регистра (characters - все символы | words - каждая буква в каждом слове | sentences - первая буква в предложении (по умолч.) | none - все в маленьком регистре)
  // keyboardType - тип клавиатуры
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab'
  }
})

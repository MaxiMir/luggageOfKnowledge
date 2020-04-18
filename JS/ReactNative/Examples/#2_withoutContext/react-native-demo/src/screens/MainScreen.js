import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

  useEffect(() => { // без 2 параметра вызовется 1 раз при инициализации этого компонента
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => { // при переходе на другой экран очищаем обработчик update. Вызовется при destroy данного компонента
      Dimensions.removeEventListener('change', update)
    }
  })

  const content = !todos.length
    ?
    <View>
      <Image
        source={ require('../../assets/no-items.png') }
        style={ styles.image }
      />
    </View>
    :
    <View style={ { width: deviceWidth } }>
      <FlatList
        data={ todos }
        keyExtractor={ item => item.id.toString() }
        renderItem={ ({ item }) => (
          <Todo
            todo={ item }
            onRemove={ removeTodo }
            onOpen={ openTodo }
          />
        ) }
      />
    </View>

  // keyExtractor - для key компонентов
  // require - добавление модулей или сущностей (NodeJS)
  // для внешних картинок source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}

  return (
    <View style={ styles.imageWrap }>
      <AddTodo onSubmit={ addTodo }/>

      { content }
    </View>
  )
}

const styles = new StyleSheet.create({
  imageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain' // режим для расположения картинки
  }
})

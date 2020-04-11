import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'

import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = () => {
  const { changeScreen } = useContext(ScreenContext)
  const { todos, addTodo, removeTodo } = useContext(TodoContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  // useEffect - представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount (в отличие от них эффекты не блокируют браузер при попытке обновить экран). С помощью useEffect мы можем вызывать разные побочные эффекты после того, как компонент отрендерится
  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => { // при переходе на другой экран очищаем обработчик update. Вызовется при размонтировании компонента
      Dimensions.removeEventListener('change', update)
    }
  }) // можно передать 2-й параметр, например [count] - эффект сработает если count из предыдущего рендера !== count из следующего

  const content = !todos.length
    ?
    <View>
      <Image
        source={require('../../assets/no-items.png')}
        style={styles.image}
      />
    </View>
    :
    <View style={{width: deviceWidth}}>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Todo todo={item}
            onRemove={removeTodo}
            onOpen={changeScreen}
          />
        )}
      />
    </View>

  // require - добавление модулей или сущностей (NodeJS)
  // для внешних картинок source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}

  return (
    <View style={styles.imageWrap}>
      <AddTodo onSubmit={addTodo} />

      {content}
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
    //resizeMode: 'contain' // режим для расположения картинки
  }
})

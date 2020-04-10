import React from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  const content = !todos.length
    ?
    <View>
      <Image
        source={require('../../assets/no-items.png')}
        style={styles.image}
      />
    </View>
    :
    <FlatList
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <Todo todo={item}
          onRemove={removeTodo}
          onOpen={openTodo}
        />
      )}
    />

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

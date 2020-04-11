import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'

import { AppText } from './ui/AppText'

// TouchableOpacity - при нажатии меняется прозрачность элементов в дочерних компонентах

export const Todo = ({ todo, onRemove, onOpen }) => {

 return (
   <TouchableOpacity
    activeOpacity={0.5}
    onPress={() => onOpen(todo.id)}
    onLongPress={() => onRemove(todo.id)}
  >
    <View style={styles.todo}>
      <AppText style={styles.title}>{todo.title}</AppText>
    </View>
  </TouchableOpacity>
 )
}

// onLongPress - долгое нажатие на элемент
// () => onRemove(todo.id) или onRemove.bind(null, todo.id)

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
})

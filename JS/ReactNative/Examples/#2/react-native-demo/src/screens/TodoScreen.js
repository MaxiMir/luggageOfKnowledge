import React from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'

export const TodoScreen = ({ todo, goBack }) => {
  return (
    <View>
      <Text>{todo.title}</Text>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Назад" onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button title="Удалить" color="#ff0000" onPress={() => {}} />
        </View>
      </View>
    </View>
  )
}

const styles = new StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '40%'
  }
})

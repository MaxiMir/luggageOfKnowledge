import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data, onOpen }) => {
  if (!data.length) {
    return (
      <View style={style.wrapper}>
        <Text style={styles.noItems}>
          Постов пока нет
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        keyExtractor={post => post.id.toString()}
        renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    fontSize: 18
  }
})

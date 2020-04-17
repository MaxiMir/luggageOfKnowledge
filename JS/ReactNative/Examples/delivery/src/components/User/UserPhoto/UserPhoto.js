import React from 'react'
import { View, Image, StyleSheet } from 'react-native'


export const UserPhoto = ({ image }) => (
  <View style={styles.imageContainer}>
    <Image
      source={require('../../../../assets/mock/mockAvatar.png')}
      style={styles.image}
    />
  </View>
)

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100
  },
})

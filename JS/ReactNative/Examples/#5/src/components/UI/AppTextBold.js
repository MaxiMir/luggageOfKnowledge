import React from 'react'
import { Text, StyleSheet } from 'react-native'


export const AppTextBold = ({ style, children }) => (
  <Text style={{...styles.default, ...style}}>
    {children}
  </Text>
)

const styles = StyleSheet.create({
  default: {
    fontFamily: 'open-bold'
  }
})

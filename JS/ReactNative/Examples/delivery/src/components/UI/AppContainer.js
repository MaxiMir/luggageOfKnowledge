import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../../theme'


export const AppContainer = ({ children, style }) => (
  <View style={ { ...styles.default, ...style } }>
    { children }
  </View>
)

const styles = StyleSheet.create({
  default: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: THEME.PADDING,
    backgroundColor: THEME.BACKGROUND_COLOR
  }
})

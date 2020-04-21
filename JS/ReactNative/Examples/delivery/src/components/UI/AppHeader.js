import React from 'react'
import { StyleSheet } from 'react-native'

import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppHeader = ({ children, style }) => (
  <AppTextBold style={ { ...styles.default, ...style } }>
    { children }
  </AppTextBold>
)

const styles = StyleSheet.create({
  default: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

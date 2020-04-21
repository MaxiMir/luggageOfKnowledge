import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppIconContainer = ({ children, number }) => (
  <View style={ styles.iconContainer }>
    {
      number > 0 &&
      <View style={ styles.iconTextContainer }>
        <AppTextBold style={ styles.iconText }>{ number < 100 ? number : '99+' }</AppTextBold>
      </View>
    }
    { children }
  </View>
)

const styles = StyleSheet.create({
  iconContainer: {
    position: 'relative',
  },
  iconTextContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -15,
    right: -15,
    backgroundColor: THEME.DANGER_COLOR,
    borderRadius: 12,
    zIndex: 1000,
  },
  iconText: {
    color: THEME.WHITE_COLOR,
  }
})

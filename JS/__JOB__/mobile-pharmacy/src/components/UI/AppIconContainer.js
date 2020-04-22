import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from './AppText'
import { THEME } from '../../theme'


export const AppIconContainer = ({ children, number }) => (
  <View style={ styles.iconContainer }>
    {
      number > 0 &&
      <View style={ styles.iconTextContainer }>
        <AppText style={ styles.iconText }>{ number < 100 ? number : '99+' }</AppText>
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
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -7,
    right: -10,
    backgroundColor: THEME.DANGER_COLOR,
    borderRadius: 8,
    zIndex: 1000,
  },
  iconText: {
    fontSize: 8,
    color: THEME.WHITE_COLOR,
  }
})

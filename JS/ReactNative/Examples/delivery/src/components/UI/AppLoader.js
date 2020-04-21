import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'

export const AppLoader = ({ color = THEME.MAIN_COLOR, text = null }) => (
  <View style={ styles.loaderContainer }>
    { text && <AppTextBold style={ styles.text }>{ text }</AppTextBold> }
    <ActivityIndicator
      color={ color }
    />
  </View>
)

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

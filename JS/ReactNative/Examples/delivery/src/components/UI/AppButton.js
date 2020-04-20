import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppTouchableBlock } from './AppTouchableBlock'
import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppButton = ({ onPress, children, color = THEME.MAIN_COLOR, disabled = false }) => {
  let btnContainerStyle = { ...styles.button, backgroundColor: color }

  if (disabled) {
    btnContainerStyle = { ...btnContainerStyle, ...styles.disabledButton }
  }

  return (
    <AppTouchableBlock onPress={ onPress } disabled={ disabled }>
      <View style={btnContainerStyle}>
        <AppTextBold style={ styles.text }>
          { children }
        </AppTextBold>
      </View>
    </AppTouchableBlock>
  )
}


const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabledButton: {
    opacity: 0.5
  },
  text: {
    color: THEME.WHITE_COLOR
  }
})


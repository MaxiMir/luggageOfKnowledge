import React from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native'


export const AppTouchableBlock = ({ children, onPress, disabled }) => {
  const Wrapper = Platform.OS === 'android' ?
    TouchableNativeFeedback
    :
    TouchableOpacity

  return (
    <Wrapper
      onPress={ onPress }
      activeOpacity={ 0.7 }
      disabled={ disabled }
    >
      { children }
    </Wrapper>
  )
}

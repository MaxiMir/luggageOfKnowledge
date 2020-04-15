import React from 'react'
import { View, Linking, Platform, TouchableNativeFeedback, TouchableOpacity, StyleSheet } from 'react-native'

import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppPhone = ({ phone, color = THEME.MAIN_COLOR }) => {
  const Wrapper = Platform.OS === 'android' ?
    TouchableNativeFeedback
    :
    TouchableOpacity

  const pressHandler = () => Linking.openURL(`tel:${phone}`)

  return (
    <Wrapper activeOpacity={0.7} onPress={pressHandler}>
      <View>
        <AppTextBold style={{...styles.phone, color }}>
          { phone }
        </AppTextBold>
      </View>
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  phone: {

  }
})

import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'

import { THEME } from '../theme'
import { AppTextBold } from './ui/AppTextBold'

export const Navbar = ({title}) => {
  return (
    <View style={{...styles.navbar, ...Platform.select({
      ios: styles.navbarIos, // добавляем стили в зависимости от ОС
      android: styles.navbarAndroid
    })}}>
      <AppTextBold style={styles.text}>{title}</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    // display: flex + flex-direction: column - по умолчанию
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
    fontSize: 20
  }
})

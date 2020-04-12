import React from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { THEME } from '../theme'

export const AppHeaderIcon = props => (
  <HeaderButton
    {...props}
    iconSize={24}
    IconComponent={Ionicons}
    color={Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR}
  />
)

// В IconComponent - передаем набор иконок Ionicons

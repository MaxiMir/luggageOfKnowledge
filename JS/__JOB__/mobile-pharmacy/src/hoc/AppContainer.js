import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { THEME } from '../theme'
import { AppTextBold } from '../components/UI/AppTextBold'


export const AppContainer = ({ children, style }) => {
  let messageBlock = null
  const { message, isSuccess } = useSelector(state => state.app)

  if (message) {
    const backgroundColor = isSuccess ? THEME.SUCCESS_COLOR : THEME.DANGER_COLOR

    messageBlock = (
      <View style={ { ...styles.messageBlock, backgroundColor } }>
        <AppTextBold style={ styles.messageText }>
          { message }
        </AppTextBold>
      </View>
    )
  }

  return (
    <View style={ { ...styles.default, ...style } }>
      { messageBlock }
      { children }
    </View>
  )
}
const styles = StyleSheet.create({
  default: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: THEME.PADDING,
    backgroundColor: THEME.BACKGROUND_COLOR
  },
  messageBlock: {
    opacity: 0.6,
    width: '100%',
    position: 'absolute',
    top: '10%',
    padding: THEME.PADDING,
    backgroundColor: THEME.SUCCESS_COLOR,
    borderRadius: 10,
    zIndex: 1500,
  },
  messageText: {
    textAlign: 'center',
    color: THEME.WHITE_COLOR,
  },
  childrenContainer: {
    width: '100%'
  }
})

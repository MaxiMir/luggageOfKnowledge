import React from 'react'
import { View, Linking } from 'react-native'

import { AppTouchableBlock } from './AppTouchableBlock'
import { AppTextBold } from './AppTextBold'
import { THEME } from '../../theme'


export const AppPhone = ({ phone, color = THEME.MAIN_COLOR }) => {
  const pressHandler = () => Linking.openURL(`tel:${ phone }`)

  return (
    <AppTouchableBlock onPress={ pressHandler }>
      <View>
        <AppTextBold style={ color }>
          { phone }
        </AppTextBold>
      </View>
    </AppTouchableBlock>
  )
}

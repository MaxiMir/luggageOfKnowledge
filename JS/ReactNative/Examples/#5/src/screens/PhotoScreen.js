import React from 'react'

import { AppContainer } from '../components/ui/AppContainer'
import { AppButton } from '../components/ui/AppButton'
import { AppText } from '../components/ui/AppText'

export const PhotoScreen = ({ navigation }) => {
  return (
    <AppContainer>
      <AppButton onPress={() => navigation.navigate('TaskAdd')}>
        Создать задание
      </AppButton>
    </AppContainer>
  )
}

PhotoScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'ФОТО'
})

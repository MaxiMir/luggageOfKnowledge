import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'

import { AppHeader } from '../components/UI/AppHeader'
import { AppText } from '../components/UI/AppText'
import { AppButton } from '../components/UI/AppButton'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const HowToUseScreen = ({ navigation }) => {
  return (
    <View style={ styles.container }>
      <ScrollView>
        <AppHeader>Инструкция</AppHeader>

        <AppText style={ styles.text }>Как пользоваться приложением</AppText>

        <AppButton
          onPress={ () => navigation.navigate(SCREEN.MAIN) }
        >
          На главную
        </AppButton>
      </ScrollView>
    </View>
  )
}

HowToUseScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Как использовать приложение'
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.BACKGROUND_COLOR,
    padding: THEME.PADDING
  },
  text: {
    marginBottom: THEME.MARGIN_BOTTOM
  }
})

import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { AppContainer } from '../components/ui/AppContainer'
import { AppButton } from '../components/ui/AppButton'


export const MainScreen = ({ navigation }) => {
  return (
    <AppContainer style={styles.container}>
        <Image
          source={require('../../assets/logo-min.png')}
          style={styles.image}
        />

        <View style={styles.buttonsContainer}>
          <AppButton onPress={() => navigation.navigate('HowToUse')}>
            Как использовать приложение
          </AppButton>

          <AppButton onPress={() => navigation.navigate('AddressDirectory')}>
            Справочник адресов
          </AppButton>

        </View>
    </AppContainer>
  )
}

MainScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Главная'
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20
  },
  buttonsContainer: {
    height: 90,
    justifyContent: 'space-between'
  }
})

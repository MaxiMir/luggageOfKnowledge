import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppText } from '../components/UI/AppText'
import { AppButton } from '../components/UI/AppButton';


export const PhotoScreen = ({ navigation }) => {
  const [askCameraPermission, setAskCameraPermission] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const hasCameraPermission = status === 'granted'

    setHasCameraPermission(hasCameraPermission)
  };

  const handleBarCodeScanned = ({ type, data }) => {
    navigation.navigate('Task', { type, documentID: data })
  }

  const cbGetPermissionsAsync = useCallback(async () => {
    await getPermissionsAsync()
    setAskCameraPermission(true)
  }, [getPermissionsAsync])

  useEffect(() => {
    cbGetPermissionsAsync()
  }, [])


  if (!askCameraPermission) {
    return <AppLoader />
  }

  const content = hasCameraPermission ?
    <BarCodeScanner
      onBarCodeScanned={handleBarCodeScanned}
      style={styles.scanner}
    />
    :
    <View>
      <AppText>Для работы приложения необходим доступ к камере</AppText>
      <AppButton onPress={() => navigation.push('PhotoScreen')}>
        Попробовать снова
      </AppButton>
    </View>

  return (
    <AppContainer>
      {content}
    </AppContainer>
  )
}

PhotoScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Сканирование штрихкода'
})

const styles = StyleSheet.create({
  scanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
})

import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppText } from '../components/UI/AppText'
import { AppButton } from '../components/UI/AppButton'
import { SCREEN } from '../consts'
import { THEME } from '../theme';


export const ScanScreen = ({ navigation }) => {
  const [askCameraPermission, setAskCameraPermission] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    setHasCameraPermission(status === 'granted')
  }

  const cbGetPermissionsAsync = useCallback(async () => {
    await getPermissionsAsync()
    setAskCameraPermission(true)
  }, [getPermissionsAsync])

  const handleBarCodeScanned = ({ data }) => {
    navigation.navigate(SCREEN.TASK, {
      id: data,
      isCheckOnStatus: true
    })
  }


  useEffect(() => {
    cbGetPermissionsAsync()
  }, [])


  if (!askCameraPermission) {
    return <AppLoader/>
  }

  const content = hasCameraPermission ?
    <BarCodeScanner
      onBarCodeScanned={ handleBarCodeScanned }
      style={ styles.scanner }
    />
    :
    <View style={ styles.noAccessContainer }>
      <AppText style={ styles.noAccessText }>Для работы приложения необходим доступ к камере</AppText>
    </View>

  return (
    <AppContainer>
      { content }
    </AppContainer>
  )
}

ScanScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Сканирование штрихкода'
})

const styles = StyleSheet.create({
  scanner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noAccessText: {
    marginBottom: THEME.MARGIN_BOTTOM
  }
})
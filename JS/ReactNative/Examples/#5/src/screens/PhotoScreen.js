import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { AppContainer } from '../components/UI/AppContainer'
import { AppButton } from '../components/UI/AppButton'


export const PhotoScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [scanned, setScanned] = useState(null)

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted')
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const loadTodos = useCallback(async () => getPermissionsAsync(), [])


  useEffect(() => {
    loadTodos()
  }, [])


  if (hasCameraPermission === null) {
    return <AppButton>Requesting for camera permission</AppButton>;
  }
  if (hasCameraPermission === false) {
    return <AppButton>No access to camera</AppButton>;
  }

  return (
    <AppContainer>
      <AppButton onPress={() => navigation.navigate('TaskAdd')}>
        Создать задание
      </AppButton>

        <View style={{border: 10, borderColor: 'rgba(0,0,0,0.5)'}}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>


        {scanned && (
          <AppButton title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        )}

    </AppContainer>
  )
}

PhotoScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Сканирование штрихкода'
})

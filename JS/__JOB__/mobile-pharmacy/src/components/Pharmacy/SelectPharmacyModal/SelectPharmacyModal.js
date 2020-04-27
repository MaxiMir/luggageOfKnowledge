import React, { useCallback, useEffect, useState } from 'react'
import { Modal, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

import { AppContainer } from '../../../hoc/AppContainer'
import { AppLoader } from '../../UI/AppLoader'
import { AppHeader } from '../../UI/AppHeader'
import { AppButton } from '../../UI/AppButton'
import { AppTextBold } from '../../UI/AppTextBold'
import { PharmacyList } from '../PharmacyList/PharmacyList'
import { getAllPharmacies } from '../../../store/actions/pharmacy'
import { THEME } from '../../../theme'


export const SelectPharmacyModal = ({ visible, onClose, onSelect }) => {
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
  const [hasLocationPermission, setHasLocationPermission] = useState(null)
  const { all: pharmacies } = useSelector(state => state.pharmacy)

  const findCurrentPositionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const hasPermission = status === 'granted'

    setHasLocationPermission(hasPermission)

    if (hasPermission) {
      const { coords } = await Location.getCurrentPositionAsync({})
      setLocation(coords)
    }
  }

  const cbGetPermissionsAsync = useCallback(async () => {
    await findCurrentPositionAsync()
  }, [findCurrentPositionAsync])


  useEffect(() => {
    cbGetPermissionsAsync()
  }, [])

  useEffect(() => {
    dispatch(getAllPharmacies())
  }, [])


  const content = !pharmacies ?
    <AppLoader text='Получаю список аптек' />
    :
    <PharmacyList pharmacies={pharmacies} onSelect={onSelect} />

  return (
    <Modal visible={ visible } animationType="slide" transparent={ false }>
      <AppContainer style={styles.container}>
        <View style={styles.closeButtonContainer}>
          <AppButton onPress={onClose} color={THEME.BACKGROUND_COLOR}>
              <AppTextBold style={styles.closeButtonText}>&times;</AppTextBold>
          </AppButton>
        </View>

        <AppHeader>Выберите аптеку для отгрузки:</AppHeader>

        { content }
      </AppContainer>
    </Modal>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: THEME.PADDING
  },
  closeButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeButtonText: {
    fontSize: 35,
    color: THEME.SECONDARY_COLOR
  }
})

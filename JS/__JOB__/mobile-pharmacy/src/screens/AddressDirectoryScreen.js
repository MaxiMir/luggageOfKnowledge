import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { PharmacyList } from '../components/Pharmacy/PharmacyList/PharmacyList'
import { getAllPharmacies } from '../store/actions/pharmacy'


export const AddressDirectoryScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const pharmacies = useSelector(state => state.pharmacy.all)

  useEffect(() => {
    dispatch(getAllPharmacies())
  }, [])

  const content = !pharmacies ?
    <AppLoader text='Получаю список адресов аптек...'/>
    :
    <PharmacyList pharmacies={ pharmacies }/>

  return (
    <AppContainer>
      { content }
    </AppContainer>
  )
}

AddressDirectoryScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Справочник адресов'
})

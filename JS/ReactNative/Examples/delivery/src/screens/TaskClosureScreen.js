import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Picker } from 'react-native'

import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { TaskInfo } from '../components/Task/TaskInfo/TaskInfo'
import { getShippingAddresses } from '../store/actions/address'


export const TaskClosureScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { shippingAddresses } = useSelector(state => state.address)
  const { loading, message } = useSelector(state => state.app)
  const documentID = navigation.getParam('documentID')

  useEffect(() => {
    dispatch(getShippingAddresses())
  }, [dispatch])

  if (!shippingAddresses || loading) {
    return (
      <AppContainer>
        <AppLoader
          text={message}
        />
      </AppContainer>
    )
  }

  return (
    <AppContainer>
      <Picker
        selectedValue={shippingAddresses[0]}
        style={{ height: 200, width: 300 }}
        onValueChange={() => {}}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </AppContainer>
  )
}

TaskClosureScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Завершение задания'
})

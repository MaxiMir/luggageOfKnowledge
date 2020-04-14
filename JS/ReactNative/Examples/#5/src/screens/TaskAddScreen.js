import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppContainer } from '../components/ui/AppContainer'
import { AppHeader } from '../components/ui/AppHeader'
import { ProductList } from '../components/ProductList'
import { TaskInfo } from '../components/TaskInfo'
import { AppButton } from '../components/ui/AppButton';


export const TaskAddScreen = ({ navigation }) => {
  // const task = navigation.getParam('taskID')

  const task = {
    documentNumber: 'ЭС-00032075',
    documentDate: '04.03.2020',
    pharmacySender: 'АУ1032 Спб Абрамова 8',
    pharmacyRecipient: 'АУ1003 Спб Гражданский 66',
    products: [
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
      {id: '187', name: 'Лозартан таб. п.п.o 100м№90', quantity: 1, price: '376.26'},
    ],
    totalQuantity: 8,
    totalAmount: '3010.08'
  }

  return (
    <AppContainer>
      <AppHeader>
        Задание на перемещение товара
      </AppHeader>

      <TaskInfo
        task={task}
      />

      <ProductList
        products={task.products}
        totalQuantity={task.totalQuantity}
        totalAmount={task.totalAmount}
      />

      <View style={styles.buttonsContainer}>
        <AppButton color='#037bff' onPress={console.log}>
          Принял
        </AppButton>
        <AppButton color='#28a745' onPress={console.log}>
          Отгрузил
        </AppButton>
      </View>
    </AppContainer>
  )
}

TaskAddScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создание задания'
})

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
})

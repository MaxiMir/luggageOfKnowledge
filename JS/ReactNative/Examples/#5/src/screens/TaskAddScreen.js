import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, StyleSheet } from 'react-native'

import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { TaskInfo } from '../components/Task/TaskInfo/TaskInfo'
import { TaskProducts } from '../components/Task/TaskProducts/TaskProducts'
import { getTask } from '../store/actions/task'

export const TaskAddScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const documentID = navigation.getParam('data')

  const btnHandler = operationType => {

  }

  useEffect(() => {
    dispatch(getTask(documentID))
  }, [dispatch])

  const { info, loading } = useSelector(state => state.task)

  if (loading) {
    return (
      <AppContainer>
        <AppLoader
          text={`Получаю данные по заказу №\n${documentID}`}
        />
      </AppContainer>
    )
  }

  return (
    <AppContainer>
       <AppHeader>
         Задание на перемещение товара
       </AppHeader>

       <TaskInfo
         task={info}
       />

      <AppHeader style={styles.productListHeader}>
        Товары:
      </AppHeader>

      <TaskProducts
       products={info.products}
       totalQuantity={info.totalQuantity}
       totalAmount={info.totalAmount}
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
  productListHeader: {
    fontSize: 16,
    marginBottom: 10
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  }
})

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import { AppContainer } from '../components/UI/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { TaskInfo } from '../components/Task/TaskInfo/TaskInfo'
import { TaskProducts } from '../components/Task/TaskProducts/TaskProducts'
import { getTask, setTaskStatus } from '../store/actions/task'
import { TASK_STATUS } from '../consts'


export const TaskScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { current: task, loading } = useSelector(state => state.task)
  const documentID = navigation.getParam('documentID')

  const btnHandler = newTaskStatus => {
    const nextScreen = newTaskStatus === TASK_STATUS.ACCEPTED ? 'Tasks' : 'TaskClosure';

    dispatch(setTaskStatus(newTaskStatus))

    navigation.navigate(nextScreen, {
      documentID
    })
  }

  useEffect(() => {
    dispatch(getTask(documentID))
  }, [dispatch])


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
         task={task}
       />

      <AppHeader style={styles.productListHeader}>
        Товары:
      </AppHeader>

      <TaskProducts
       products={task.products}
       totalQuantity={task.totalQuantity}
       totalAmount={task.totalAmount}
      />

      <View style={styles.buttonsContainer}>
       <AppButton color='#037bff' onPress={() => btnHandler(TASK_STATUS.ACCEPTED)}>
         Принял
       </AppButton>
       <AppButton color='#28a745' onPress={() => btnHandler(TASK_STATUS.SHIPPED)}>
         Отгрузил
       </AppButton>
      </View>

    </AppContainer>
  )
}

TaskScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Задание'
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

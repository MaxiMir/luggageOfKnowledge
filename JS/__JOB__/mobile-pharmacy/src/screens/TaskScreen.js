import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { TaskInfo } from '../components/Task/TaskInfo/TaskInfo'
import { TaskProducts } from '../components/Task/TaskProducts/TaskProducts'
import { getTask, setTaskAccepted } from '../store/actions/task'
import { SCREEN } from '../consts'
import { THEME } from '../theme'


export const TaskScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const task = useSelector(state => state.task.current)
  const documentID = navigation.getParam('documentID')
  const isNewTask = navigation.getParam('isNewTask')
  const isCompletedTask = navigation.getParam('isCompletedTask')


  const acceptedBtnHandler = () => {
    dispatch(setTaskAccepted())
    navigation.navigate(SCREEN.TASKS)
  }

  const shippedBtnHandler = () => {
    navigation.navigate(SCREEN.TASK_CLOSURE, {
      task
    })
  }


  useEffect(() => {
    dispatch(getTask(documentID))
  }, [dispatch])

  if (!task) {
    return (
      <AppContainer>
        <AppLoader
          text={ `Получаю данные по заказу №\n${ documentID }` }
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
        task={ task }
      />

      <AppHeader style={ styles.productListHeader }>
        Товары:
      </AppHeader>

      <TaskProducts
        products={ task.products }
        totalQuantity={ task.totalQuantity }
        totalAmount={ task.totalAmount }
      />

      <View style={ styles.buttonsContainer }>
        <AppButton
          color={ THEME.PRIMARY_COLOR }
          onPress={ acceptedBtnHandler }
          disabled={ !isNewTask }
        >
          Принял
        </AppButton>
        <AppButton
          color={ THEME.SUCCESS_COLOR }
          onPress={ shippedBtnHandler }
          disabled={ isCompletedTask }
        >
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
    marginBottom: THEME.MARGIN_BOTTOM
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

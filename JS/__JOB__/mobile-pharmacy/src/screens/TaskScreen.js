import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'

import { AppContainer } from '../hoc/AppContainer'
import { AppLoader } from '../components/UI/AppLoader'
import { AppHeader } from '../components/UI/AppHeader'
import { AppButton } from '../components/UI/AppButton'
import { TaskInfo } from '../components/Task/TaskInfo/TaskInfo'
import { TaskProducts } from '../components/Task/TaskProducts/TaskProducts'
import { getTask, setTaskStatus } from '../store/actions/task'
import { SCREEN, TASK_STATUS } from '../consts'
import { THEME } from '../theme'


export const TaskScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const task = useSelector(state => state.task.current)
  const id = navigation.getParam('id')
  const isNewTaskFromNavigation = navigation.getParam('isNewTask')
  const isCompletedTaskFromNavigation = navigation.getParam('isCompletedTask')
  const isCheckOnStatus = navigation.getParam('isCheckOnStatus', false)

  useEffect(() => {
    dispatch(getTask(id))
  }, [dispatch])

  if (!task) {
    return (
      <AppContainer>
        <AppLoader
          text={ `Получаю данные по заказу №\n${ id }` }
        />
      </AppContainer>
    )
  }

  const { status_id: taskStatus } = task

  const checkOnCanAcceptTask = () => {
    if (isCheckOnStatus) {
      return taskStatus === TASK_STATUS.NEW
    }

    return isNewTaskFromNavigation
  }

  const checkOnCanShippedTask = () => {
    if (isCheckOnStatus) {
      return taskStatus < TASK_STATUS.SHIPPED
    }

    return !isCompletedTaskFromNavigation
  }

  const acceptedBtnHandler = id => {
    dispatch(setTaskStatus(id, TASK_STATUS.ACCEPTED))
    navigation.navigate(SCREEN.TASKS)
  }

  const shippedBtnHandler = () => {
    navigation.navigate(SCREEN.TASK_CLOSURE, {
      task
    })
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
        products={ task['basket'] }
        totalQuantity={ task['goods_count'] }
        totalAmount={ task['basket_cost'] }
      />

      <View style={ styles.buttonsContainer }>
        <AppButton
          color={ THEME.PRIMARY_COLOR }
          onPress={ () => acceptedBtnHandler(id) }
          disabled={ !checkOnCanAcceptTask() }
        >
          Принял
        </AppButton>
        <AppButton
          color={ THEME.SUCCESS_COLOR }
          onPress={ shippedBtnHandler }
          disabled={ !checkOnCanShippedTask() }
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

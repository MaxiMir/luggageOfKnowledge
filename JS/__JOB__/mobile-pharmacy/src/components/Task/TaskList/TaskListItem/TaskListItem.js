import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppTouchableBlock } from '../../../UI/AppTouchableBlock'
import { AppText } from '../../../UI/AppText'
import { AppTextBold } from '../../../UI/AppTextBold'
import currencyFilter from '../../../../filters/currency.filter'
import dateFilter from '../../../../filters/date.filter'
import { THEME } from '../../../../theme'


export const TaskListItem = ({ task, onPress, isCompleted }) => {
  const borderColor = isCompleted ? THEME.SECONDARY_COLOR : THEME.MAIN_COLOR
  const taskItemStyle = { ...styles.taskContainer, borderColor }
  const headerStyle = { ...styles.block, ...styles.blockWithBottomLine }
  const bodyStyle = { ...styles.blockWithBottomLine, ...styles.body, borderColor }
  const footerStyle = styles.block

  return (
    <AppTouchableBlock onPress={ onPress }>
      <View style={ taskItemStyle }>
        <View style={ headerStyle }>
          <AppText>
            <AppTextBold>№: </AppTextBold>
            { task['relocation_id'] }
          </AppText>

          <AppText>
            <AppTextBold>Дата: </AppTextBold>
            { dateFilter(task['created_at']) }
          </AppText>
        </View>

        <View style={ bodyStyle }>
          <AppText>
            <AppTextBold>Отправитель: </AppTextBold>
            { task['store'] }
          </AppText>

          <AppText>
            <AppTextBold>Получатель: </AppTextBold>
            { task['destination_store'] }
          </AppText>
        </View>

        <View style={ footerStyle }>
          <AppText>
            <AppTextBold>Упаковок: </AppTextBold>
            { task['goods_count'] }
          </AppText>

          <AppText>
            <AppTextBold>Сумма: </AppTextBold>
            { currencyFilter(task['basket_cost']) }
          </AppText>
        </View>
      </View>
    </AppTouchableBlock>
  )
}

const styles = StyleSheet.create({
  taskContainer: {
    borderWidth: 2,
    borderRadius: 10,
    padding: THEME.PADDING,
    marginBottom: THEME.MARGIN_BOTTOM,
    backgroundColor: THEME.WHITE_COLOR,
    shadowColor: THEME.BLACK_COLOR,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockWithBottomLine: {
    borderBottomWidth: 1,
    marginBottom: THEME.MARGIN_BOTTOM,
    paddingBottom: THEME.PADDING
  },
  body: {
    paddingBottom: THEME.MARGIN_BOTTOM
  }
})


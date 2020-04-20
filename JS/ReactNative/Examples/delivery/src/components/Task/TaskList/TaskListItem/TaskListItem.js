import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppTouchableBlock } from '../../../UI/AppTouchableBlock'
import { AppText } from '../../../UI/AppText'
import { AppTextBold } from '../../../UI/AppTextBold'
import currencyFilter from '../../../../filters/currency.filter'
import { THEME } from '../../../../theme';

export const TaskListItem = ({ task, onPress }) => (
    <AppTouchableBlock onPress={onPress} >
      <View style={ styles.taskContainer }>
      <View style={{ ...styles.block, ...styles.blockWithBottomLine }}>
        <AppText>
          <AppTextBold>№: </AppTextBold>
          { task.documentID }
        </AppText>

        <AppText>
          <AppTextBold>Дата: </AppTextBold>
          { task.documentDate }
        </AppText>
      </View>

      <View style={{...styles.blockWithBottomLine, ...styles.body}}>
        <AppText>
          <AppTextBold>Отправитель: </AppTextBold>
          { task.pharmacySender }
        </AppText>

        <AppText>
          <AppTextBold>Получатель: </AppTextBold>
          { task.pharmacyRecipient }
        </AppText>
      </View>

      <View style={styles.block}>
        <AppText>
          <AppTextBold>Упаковок: </AppTextBold>
          { task.totalQuantity }
        </AppText>

        <AppText>
          <AppTextBold>Сумма: </AppTextBold>
          { currencyFilter(task.totalAmount) }
        </AppText>
      </View>
    </View>
  </AppTouchableBlock>
)

const styles = StyleSheet.create({
  taskContainer: {
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 10,
    padding: THEME.PADDING,
    marginBottom: THEME.MARGIN_BOTTOM
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blockWithBottomLine: {
    borderBottomWidth: 1,
    borderColor: THEME.MAIN_COLOR,
    marginBottom: THEME.MARGIN_BOTTOM,
    paddingBottom: THEME.PADDING
  },
  body: {
    paddingBottom: THEME.MARGIN_BOTTOM
  }
})


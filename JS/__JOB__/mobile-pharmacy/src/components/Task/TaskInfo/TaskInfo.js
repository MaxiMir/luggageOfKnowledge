import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from '../../UI/AppText'
import { AppTextBold } from '../../UI/AppTextBold'
import dateFilter from '../../../filters/date.filter'
import { THEME } from '../../../theme'


export const TaskInfo = ({ task }) => (
  <View style={ styles.taskInfo }>
    <AppText>
      <AppTextBold>Перемещение №</AppTextBold> { task['relocation_id'] }
    </AppText>

    <AppText>
      <AppTextBold>от:</AppTextBold> { dateFilter(task['created_at']) }
    </AppText>

    <AppText>
      <AppTextBold>Аптека отправитель:</AppTextBold> { task['store'] }
    </AppText>

    <AppText>
      <AppTextBold>Аптека получатель:</AppTextBold> { task['destination_store'] }
    </AppText>
  </View>
)

const styles = StyleSheet.create({
  taskInfo: {
    width: '100%',
    marginBottom: THEME.MARGIN_BOTTOM
  }
})


import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from '../../UI/AppText'
import { AppTextBold } from '../../UI/AppTextBold'
import { THEME } from '../../../theme'


export const TaskInfo = ({ task }) => (
  <View style={styles.taskInfo}>
    <AppText>
      <AppTextBold>Перемещение №</AppTextBold> {task.documentID}
    </AppText>

    <AppText>
      <AppTextBold>от:</AppTextBold> {task.documentDate}
    </AppText>

    <AppText>
      <AppTextBold>Аптека отправитель:</AppTextBold> {task.pharmacySender}
    </AppText>

    <AppText>
      <AppTextBold>Аптека получатель:</AppTextBold> {task.pharmacyRecipient}
    </AppText>
  </View>
)

const styles = StyleSheet.create({
  taskInfo: {
    width: '100%',
    marginBottom: THEME.MARGIN_BOTTOM
  }
})


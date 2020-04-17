import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from '../UI/AppText'
import { AppTextBold } from '../UI/AppTextBold'
import { AppPhone } from '../UI/AppPhone'
import { UserPhoto } from './UserPhoto/UserPhoto'


export const User = ({ user }) => (
  <View styles={styles.info}>
    <View>
      <UserPhoto
        image={user.image}
      />
    </View>

    <View style={styles.infoRow}>
      <AppTextBold>ФИО: </AppTextBold>
      <AppText>{ user.fullName }</AppText>
    </View>

    <View style={styles.infoRow}>
      <AppTextBold>Должность: </AppTextBold>
      <AppText>{ user.post }</AppText>
    </View>

    <View style={styles.infoRow}>
      <AppTextBold>Телефон: </AppTextBold>
      <AppPhone
        phone={user.phone}
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: 'center'
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row'
  }
})


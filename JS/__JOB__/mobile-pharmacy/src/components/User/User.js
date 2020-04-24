import React from 'react'
import { View, StyleSheet } from 'react-native'

import { AppText } from '../UI/AppText'
import { AppTextBold } from '../UI/AppTextBold'
import { AppPhone } from '../UI/AppPhone'
import { UserPhoto } from './UserPhoto/UserPhoto'
import { THEME } from '../../theme';


export const User = ({ user }) => (
  <View styles={ styles.info }>
    <View>
      <UserPhoto
        image={ user.image || '../../../../assets/mock/mockAvatar.png' }
      />
    </View>

    <View style={ styles.infoRow }>
      <AppTextBold>ФИО: </AppTextBold>
      <AppText>{ user.name }</AppText>
    </View>

    <View style={ styles.infoRow }>
      <AppTextBold>Должность: </AppTextBold>
      <AppText>{ user.post || 'Не заполнена' }</AppText>
    </View>

    <View style={ styles.infoRow }>
      <AppTextBold>Телефон: </AppTextBold>
      <AppPhone
        phone={ user.phone }
      />
    </View>
  </View>
)

const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: THEME.MARGIN_BOTTOM / 2
  }
})


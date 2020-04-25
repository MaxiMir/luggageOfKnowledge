import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

import { AppText } from '../../../UI/AppText'
import { AppTextBold } from '../../../UI/AppTextBold'
import { AppPhone } from '../../../UI/AppPhone'
import { THEME } from '../../../../theme'


export const PharmacyListItem = ({ pharmacy }) => {
  const textListData = [
    { name: 'au_code', IconComponent: Entypo, iconName: 'list', label: 'код АУ' },
    { name: 'address', IconComponent: Entypo, iconName: 'address', label: 'адрес аптеки' },
    { name: 'brand', IconComponent: Entypo, iconName: 'archive', label: 'производитель' },
    { name: 'operation_mode', IconComponent: Entypo, iconName: 'clock', label: 'режим работы' },
  ]

  const textListContent = textListData.map(({ name, IconComponent, iconName, label }) => (
    <View style={ styles.block } key={ name }>
      <IconComponent name={ iconName } size={ 20 } style={ styles.icon }/>
      <AppTextBold style={ styles.text }>
        { label }:
      </AppTextBold>
      <AppText>
        { pharmacy[name] }
      </AppText>
    </View>
  ))

  return (
    <View style={ styles.pharmacyContainer }>
      { textListContent }

      <View style={ styles.block }>
        <Entypo name='old-phone' size={ 20 } style={ styles.icon }/>
        <AppTextBold style={ styles.text }>
          телефон:
        </AppTextBold>
        <AppPhone
          phone={ pharmacy.phone }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pharmacyContainer: {
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
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
    flexWrap: 'wrap',
    marginBottom: 5
  },
  icon: {
    color: THEME.MAIN_COLOR,
    marginRight: 5
  },
  text: {
    marginRight: 5
  }
})


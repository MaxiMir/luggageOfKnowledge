import React from 'react'
import { View, StyleSheet } from 'react-native'

import { THEME } from '../../../../theme'
import { AppText } from '../../../UI/AppText';
import { AppTextBold } from '../../../UI/AppTextBold';


export const AddressListItem = ({ address }) => (
  <View>
    <AppText>
      <AppTextBold>
        код АУ
      </AppTextBold>
      { address.code }
    </AppText>

    <AppText>
      <AppTextBold>
        адрес аптеки
      </AppTextBold>
      { address.address }
    </AppText>

    - код АУ
    -
    - бренд
    - режим работы
    - телефон

  </View>
)

const styles = StyleSheet.create({
  taskContainer: {
    position: 'relative',
    borderWidth: 2,
    borderRadius: 10,
    padding: THEME.PADDING,
    marginBottom: THEME.MARGIN_BOTTOM,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
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


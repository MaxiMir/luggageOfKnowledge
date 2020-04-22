import React from 'react'
import { View, FlatList } from 'react-native'

import { AppHeader } from '../../UI/AppHeader'
import { AddressListItem } from './AddressListItem/AddressListItem'


export const AddressList = ({ addresses }) => {
  return (
    <View>
      <AppHeader>
        Справочник адресов
      </AppHeader>

      <FlatList
        data={ addresses }
        keyExtractor={ address => address.code }
        renderItem={ ({ item }) => (
          <AddressListItem address={ item } />
        ) }
      />
    </View>
  )
}

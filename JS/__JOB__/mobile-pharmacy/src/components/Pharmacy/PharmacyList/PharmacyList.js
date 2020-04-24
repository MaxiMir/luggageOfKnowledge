import React, { useState } from 'react'
import { View, TextInput, FlatList, StyleSheet } from 'react-native'

import { PharmacyListItem } from './PharmacyListItem/PharmacyListItem'
import { THEME } from '../../../theme'


export const PharmacyList = ({ pharmacies }) => {
  const [searchValue, setSearchValue] = useState('')

  if (searchValue.trim()) {
    const prepareSearchValue = searchValue.trim().toLowerCase()

    pharmacies = pharmacies.filter(({ code, address }) => {
      return code.toLowerCase().includes(prepareSearchValue) || address.toLowerCase().includes(prepareSearchValue)
    })
  }

  return (
    <View style={ styles.pharmacyListContainer }>
      <View style={ styles.searchInputContainer }>
        <TextInput
          style={ styles.searchInput }
          value={ searchValue }
          placeholder='Поиск по коду АУ или адресу'
          onChangeText={ setSearchValue }
        />
      </View>

      <FlatList
        data={ pharmacies }
        keyExtractor={ pharmacy => pharmacy.code }
        renderItem={ ({ item }) => (
          <PharmacyListItem pharmacy={ item }/>
        ) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  pharmacyListContainer: {
    width: '100%',
  },
  searchInputContainer: {
    padding: THEME.PADDING,
    borderWidth: 2,
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5,
    marginBottom: THEME.MARGIN_BOTTOM
  },
  searchInput: {
    width: '100%'
  }
})


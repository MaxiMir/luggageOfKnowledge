import React, { useState } from 'react'
import { View, TextInput, FlatList, StyleSheet } from 'react-native'

import { PharmacyListItem } from './PharmacyListItem/PharmacyListItem'
import { THEME } from '../../../theme'
import { AppTextBold } from '../../UI/AppTextBold';


export const PharmacyList = ({ pharmacies, onSelect }) => {
  const [searchValue, setSearchValue] = useState('')

  if (searchValue.trim()) {
    const prepareSearchValue = searchValue.trim().toLowerCase()

    pharmacies = pharmacies.filter(({ au_code, address }) => {
      if (!address) {
        return au_code.toLowerCase().includes(prepareSearchValue)
      }

      return au_code.toLowerCase().includes(prepareSearchValue) || address.toLowerCase().includes(prepareSearchValue)
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
      {
        !pharmacies.length ?
        <AppTextBold style={styles.noFoundText}>Ничего не найдено</AppTextBold>
        :
        <FlatList
          data={ pharmacies }
          keyExtractor={ pharmacy => pharmacy.id.toString() }
          renderItem={ ({ item }) => (
            <PharmacyListItem pharmacy={ item } onSelect={onSelect} />
          ) }
        />
      }

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
  },
  noFoundText: {
    textAlign: 'center'
  }
})


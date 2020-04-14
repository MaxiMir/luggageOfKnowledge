import React from 'react'
import { View, StyleSheet, ScrollView  } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

import { THEME } from '../theme';
import { AppTextBold } from './ui/AppTextBold';

export const ProductList = ({ products, totalQuantity, totalAmount }) => {
  const tableHead = ['Название товара', 'Уп.', 'Сумма']
  const tableData = products.map(({name, quantity, price }) => [name, quantity, price])
  const tableFooter = ['Итого:', totalQuantity, totalAmount]
  const flexArr = [3, 1, 1]

  return (
    <View style={styles.productsList}>
      <View style={styles.productListHeader}>
        <AppTextBold>Товары:</AppTextBold>
      </View>

      <ScrollView vertical={true}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row
            data={tableHead}
            style={styles.head}
            textStyle={styles.textInHead}
            flexArr={flexArr}
          />
          <Rows
            data={tableData}
            textStyle={styles.textInBody}
            flexArr={flexArr}
          />
          <Row
            data={tableFooter}
            style={styles.footer}
            textStyle={styles.textInFooter}
            flexArr={flexArr}
          />
        </Table>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  productsList: {
    width: '100%',
    marginBottom: 20
  },
  productListHeader: {
    marginBottom: 10
  },
  head: {
    height: 40,
    backgroundColor: THEME.MAIN_COLOR
  },
  textInHead: {
    color: THEME.WHITE_COLOR,
    margin: THEME.TABLE_ROWS_MARGIN
  },
  textInBody: {
    margin: THEME.TABLE_ROWS_MARGIN
  },
  textInFooter: {
    margin: THEME.TABLE_ROWS_MARGIN,
    fontWeight: 'bold'
  },
  footer: {
    height: 40
  }
});

import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

import { THEME } from '../../../theme';

export const TaskProducts = ({ products, totalQuantity, totalAmount }) => {
  const tableHead = ['Название товара', 'Уп.', 'Сумма']
  const tableBody = products.map(({name, quantity, price }) => [name, quantity, price])
  const tableFooter = ['Итого:', totalQuantity, totalAmount]
  const flexArr = [4, 1, 2]

  return (
    <ScrollView style={styles.scrollView}>
      <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
        <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.textInHead}
          flexArr={flexArr}
        />
        <Rows
          data={tableBody}
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
  )
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%'
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

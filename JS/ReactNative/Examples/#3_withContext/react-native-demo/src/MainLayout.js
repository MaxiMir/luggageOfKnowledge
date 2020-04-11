import React, { useContext } from 'react'
import { StyleSheet, View } from 'react-native';

import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { Navbar } from './components/Navbar'
import { ScreenContext } from './context/screen/screenContext'
import { THEME } from './theme';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>
        { todoId ? <TodoScreen /> :  <MainScreen /> }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
})

// основной layout

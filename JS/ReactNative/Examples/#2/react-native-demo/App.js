import React, { useState } from 'react' // useState - для локального state
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

/**
  * StyleSheet - класс для создания стилей для блоков. Производит оптимизации (объёдинение|удаление лишних стилей) + делает валидацию свойств

  * View - аналог <div>

  * ScrollView - аналог View только со скроллом

  * FlatList - отображает скролящийся лист данных, которые могут изменятся
*/

async function loadApplication() {
  await Font.loadAsync({ // загрузка шрифтов
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'), // название шрифта
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf') // название шрифта
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null) // разводная | детальная
  const [todos, setTodos] = useState([]) // [] - дефолтный state


  if (!isReady) { // приложение не будет отрисовываться, пока приложение не будет готово
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
    />
    )

    // startAsync - старт асинхронной функции в фоне
  }

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title
    }

    setTodos(prev => [ ...prev, newTodo ])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)

    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel', // iOS
        },
        {
          text: 'Удалить',
          style: 'destructive', // iOS
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter((todo => todo.id !== id)))
          }
        },
      ],
      { cancelable: false }, // false - по клику по overlay модальное окно не закрывается
    );
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }

      return todo
    }))
  }


  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
        onRemove={removeTodo}
      />
    )
  }


  return (
    <View>
      <Navbar title="Todo App" />
      <View style={styles.container}>{ content }</View>
    </View>
  );

  // keyExtractor - для key компонентов
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
  }
});

import React, { useState } from 'react' // useState - для локального state
import { StyleSheet, View } from 'react-native'
import { Navbar } from './src/components/NavBar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'


/**
  * StyleSheet - класс для создания стилей для блоков. Производит оптимизации (объёдинение|удаление лишних стилей) + делает валидацию свойств

  * View - аналог <div>

  * ScrollView - аналог View только со скроллом

  * FlatList - отображает скролящийся лист данных, которые могут изменятся
 */

export default function App() {
  const [todoId, setTodoId] = useState(null) // разовдная | детальная
  const [todos, setTodos] = useState([]) // [] - дефолтный state

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title
    }

    setTodos(prev => [ ...prev, newTodo ])
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter((todo => todo.id !== id)))
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
      <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo} />
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

import React, {useState} from 'react' // useState - для локального state
import {StyleSheet, View, ScrollView, FlatList} from 'react-native'
import {Navbar} from './src/NavBar'
import {AddTodo} from './src/AddTodo'
import {Todo} from './src/Todo'

/**
 * StyleSheet - класс для создания стилей для блоков. Производит оптимизации (объёдинение|удаление лишних стилей) + делает валидацию свойств

 * View - аналог <div>

 * ScrollView - аналог View только со скроллом

 * FlatList - отображает скроллящийся лист данных, которые могут изменятся
 */

export default function App() {
	const [todos, setTodos] = useState([]) // [] - дефолтный state

	const addTodo = (title) => {
		const newTodo = {
			id: Date.now().toString(),
			title
		}

		setTodos(prev => [...prev, newTodo])
	}

	const removeTodo = id => {
		setTodos(prev => prev.filter((todo => todo.id !== id)))
	}

	return (
		<View>
			<Navbar title="Todo App"/>
			<View style={styles.container}>
				<AddTodo onSubmit={addTodo}/>

				{ /* #1: */}
				<ScrollView>
					{todos.map(todo => (
						<Todo todo={todo} key={todo.id}/>
					))}
				</ScrollView>

				{ /* #2: */}
				<FlatList
					data={todos}
					keyExtractor={item => item.id.toString()}
					renderItem={({item}) => (
						<Todo todo={item}
						      onRemove={removeTodo}
						/>
					)}
				/>

			</View>
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

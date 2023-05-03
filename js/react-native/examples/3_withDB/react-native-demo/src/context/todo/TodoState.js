import React, {useContext, useReducer} from 'react'
import {Alert} from 'react-native'

import {Http} from '../../http'
import {ScreenContext} from '../screen/screenContext'
import {TodoContext} from './todoContext'
import {todoReducer} from './todoReducer'
import {
	ADD_TODO,
	CLEAR_ERROR,
	FETCH_TODOS,
	HIDE_LOADER,
	REMOVE_TODO,
	SHOW_ERROR,
	SHOW_LOADER,
	UPDATE_TODO
} from '../types'


export const TodoState = ({children}) => {
	const initialState = {
		todos: [],
		loading: false,
		error: null
	}

	const {changeScreen} = useContext(ScreenContext) // можем использоватеть, тк TodoState вложен в ScreenState
	const [state, dispatch] = useReducer(todoReducer, initialState)

	// state - текущий state
	// dispatch - ф-я позволяющая меняеть state через reducer

	const fetchTodos = async () => {
		showLoader() // показываем loader
		clearError() // очищаем все ошибки

		try {
			const data = await Http.get('https://react-native-demo-9c073.firebaseio.com/todos.json')
			const todos = !data ? [] : Object.keys(data).map(key => ({
				...data[key],
				id: key
			}))

			dispatch({type: FETCH_TODOS, todos})
		} catch (e) {
			showError('Что-то пошло не так...')
		} finally {
			hideLoader() // скрываем loader
		}
	}

	const addTodo = async title => {
		clearError()

		try {
			const {name: id} = await Http.post('https://react-native-demo-9c073.firebaseio.com/todos.json', {title}) // в name содержится id записи
			dispatch({type: ADD_TODO, title, id})
		} catch (e) {
			showError('Что-то пошло не так...')
		}
	}

	const removeTodo = id => {
		const todo = state.todos.find(t => t.id === id)

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
					onPress: async () => {
						changeScreen(null) // для редиректа на главную
						await Http.delete(`https://react-native-demo-9c073.firebaseio.com/todos/${id}.json`)
						dispatch({type: REMOVE_TODO, id})
					}
				},
			],
			{cancelable: false}, // false - по клику по overlay модальное окно не закрывается
		)
	}

	const updateTodo = async (id, title) => {
		clearError()

		try {
			await Http.patch(`https://react-native-demo-9c073.firebaseio.com/todos/${id}.json`, {title})

			dispatch({type: UPDATE_TODO, id, title})
		} catch (e) {
			showError('Что-то пошло не так...')
		}
	}

	const showLoader = () => dispatch({type: SHOW_LOADER})

	const hideLoader = () => dispatch({type: HIDE_LOADER})

	const showError = error => dispatch({type: SHOW_ERROR, error})

	const clearError = () => dispatch({type: CLEAR_ERROR})

	return (
		<TodoContext.Provider
			value={{
				todos: state.todos,
				fetchTodos,
				loading: state.loading,
				error: state.error,
				addTodo,
				removeTodo,
				updateTodo
			}}
		>
			{children}
		</TodoContext.Provider>
	)
}

// передаем в TodoContext.Provider todos и функции для дальнейшего использования
// в TodoState оборачиваем приложение в App.js

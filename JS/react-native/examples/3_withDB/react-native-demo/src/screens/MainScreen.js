import React, {useState, useEffect, useContext, useCallback} from 'react'
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native'

import {ScreenContext} from '../context/screen/screenContext'
import {TodoContext} from '../context/todo/todoContext'
import {AppLoader} from '../components/ui/AppLoader'
import {AppText} from '../components/ui/AppText'
import {AppButton} from '../components/ui/AppButton';
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'
import {THEME} from '../theme'

export const MainScreen = () => {
	const {changeScreen} = useContext(ScreenContext)
	const {todos, fetchTodos, addTodo, removeTodo, loading, error} = useContext(TodoContext)

	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
	)

	// Хук useCallback принимает функцию и массив аргументов, и возвращает одну и туже функцию, до тех пор, пока аргументы не изменились.
	const loadTodos = useCallback(async () => fetchTodos(), [fetchTodos])

	// Хук useEffect - представляет собой совокупность методов componentDidMount, componentDidUpdate, и componentWillUnmount (в отличие от них эффекты не блокируют браузер при попытке обновить экран).
	useEffect(() => { // вызовется 1 раз на начальном рендеринге, тк передан []
		loadTodos()
	}, [])

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
			setDeviceWidth(width)
		}

		Dimensions.addEventListener('change', update)

		return () => { // при переходе на другой экран очищаем обработчик update. Вызовется при размонтировании компонента
			Dimensions.removeEventListener('change', update)
		}
	}) // можно передать 2-й параметр, например [count] - эффект сработает если count из предыдущего рендера !== count из следующего


	if (loading) {
		return <AppLoader/>
	}

	if (error) {
		return (
			<View style={styles.center}>
				<AppText style={styles.error}>{error}</AppText>
				<AppButton onPress={loadTodos}>Повторить</AppButton>
			</View>
		)
	}

	const content = !todos.length
		?
		<View>
			<Image
				source={require('../../assets/no-items.png')}
				style={styles.image}
			/>
		</View>
		:
		<View style={{width: deviceWidth}}>
			<FlatList
				data={todos}
				keyExtractor={item => item.id.toString()}
				renderItem={({item}) => (
					<Todo todo={item}
					      onRemove={removeTodo}
					      onOpen={changeScreen}
					/>
				)}
			/>
		</View>

	// require - добавление модулей или сущностей (NodeJS)
	// для внешних картинок source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }}

	return (
		<View style={styles.imageWrap}>
			<AddTodo onSubmit={addTodo}/>

			{content}
		</View>
	)
}
const styles = StyleSheet.create({
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	error: {
		fontSize: 20,
		color: THEME.DANGER_COLOR
	}
})

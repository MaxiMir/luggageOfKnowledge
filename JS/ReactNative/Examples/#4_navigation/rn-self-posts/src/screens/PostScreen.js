import React, {useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import {Item, HeaderButtons} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'

import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {removePost, toggleBooked} from '../store/actions/post';
import {THEME} from '../theme'

export const PostScreen = ({navigation}) => {
	const dispatch = useDispatch()
	const postId = navigation.getParam('postId') // получение значения из переданных параметров

	const post = useSelector(state =>
		state.post.allPosts.find(p => p.id === postId)
	)

	const booked = useSelector(state =>
		state.post.bookedPosts.some(post => post.id === postId)
	)

	useEffect(() => {
		navigation.setParams({booked})
	}, [booked]) // если меняется меняем navigation params

	const toggleHandler = useCallback(() => { // useCallback - чтобы cb вызывался 1 раз
		dispatch(toggleBooked(post)) // изменяем state
	}, [dispatch, post])

	useEffect(() => { // передаем обработчик
		navigation.setParams({toggleHandler})
	}, [toggleHandler])


	const removeHandler = () => {
		Alert.alert(
			'Удаление поста',
			'Вы точно хотите удалить пост?',
			[
				{
					text: 'Отменить',
					style: 'cancel'
				},
				{
					text: 'Удалить',
					style: 'destructive',
					onPress() { // destructive - для iOS (кнопка красного цвета)
						navigation.navigate('Main')
						dispatch(removePost(postId))
					}
				}
			],
			{cancelable: false}
		)
	}

	return (
		<ScrollView>
			<Image source={{uri: post.img}} style={styles.image}/>
			<View style={styles.textWrap}>
				<Text style={styles.title}>{post.text}</Text>
			</View>
			<Button
				title='Удалить'
				color={THEME.DANGER_COLOR}
				onPress={removeHandler}
			/>
		</ScrollView>
	)
}

// ScrollView - для скрола текста в текущем компоненте


PostScreen.navigationOptions = ({navigation}) => {
	const date = navigation.getParam('date')
	const booked = navigation.getParam('booked')
	const toggleHandler = navigation.getParam('toggleHandler')
	const iconName = booked ? 'ios-star' : 'ios-star-outline'

	return {
		headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(), // название страницы
		headerRight: (
			<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
				<Item
					title='Take photo'
					iconName={iconName}
					onPress={toggleHandler}
				/>
			</HeaderButtons>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	textWrap: {
		padding: 10
	},
	title: {
		fontFamily: 'open-regular'
	}
})

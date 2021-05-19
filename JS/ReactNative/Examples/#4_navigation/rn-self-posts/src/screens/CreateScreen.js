import React, {useState, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {THEME} from '../theme'
import {addPost} from '../store/actions/post'
import {PhotoPicker} from '../components/PhotoPicker'

export const CreateScreen = ({navigation}) => {
	const dispatch = useDispatch()
	const [text, setText] = useState('')
	const imgRef = useRef() // при изменении не вызывает перерендеринг

	const saveHandler = () => {
		const post = {
			date: new Date().toJSON(),
			text: text,
			img: imgRef.current,
			booked: false
		}
		dispatch(addPost(post))
		navigation.navigate('Main')
	}

	const photoPickHandler = uri => {
		imgRef.current = uri // изменяем ref
	}

	// TouchableWithoutFeedback - позволяет задать события для компонентов
	// Здесь добавили чтобы по клику по компоненту скрывалась клавиатура

	return (
		<ScrollView>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View style={styles.wrapper}>
					<Text style={styles.title}>Создай новый пост</Text>
					<TextInput
						style={styles.textarea}
						placeholder='Введите текст заметки'
						value={text}
						onChangeText={setText}
						multiline
					/>
					<PhotoPicker onPick={photoPickHandler}/>
					<Button
						title='Создать пост'
						color={THEME.MAIN_COLOR}
						onPress={saveHandler}
						disabled={!text}
					/>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	)
}

CreateScreen.navigationOptions = ({navigation}) => ({
	headerTitle: 'Создать пост',
	headerLeft: (
		<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
			<Item
				title='Toggle Drawer'
				iconName='ios-menu'
				onPress={() => navigation.toggleDrawer()}
			/>
		</HeaderButtons>
	)
})

const styles = StyleSheet.create({
	wrapper: {
		padding: 10
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'open-regular',
		marginVertical: 10
	},
	textarea: {
		padding: 10,
		marginBottom: 10
	}
})

import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Modal, Alert} from 'react-native'

import {THEME} from '../theme'
import {AppButton} from './ui/AppButton'


export const EditModal = ({visible, value, onSave, onCancel}) => {
	const [title, setTitle] = useState(value)

	const saveHandler = () => {
		if (title.trim().length > 3) {
			onSave(title)
			return
		}

		Alert.alert('Ошибка!', `Минимальная длина названия 3 символа.`)
	}

	return (
		<Modal visible={visible} animationType="slide" transparent={false}>
			<View style={styles.wrap}>
				<TextInput
					value={title}
					placeholder="Введите название"
					autoCapitalize="none"
					autoCorrect={false}
					maxLength={64}
					style={styles.input}
					onChangeText={setTitle}
				/>
				<View style={styles.buttons}>
					<AppButton
						onPress={onCancel}
						color={THEME.DANGER_COLOR}
					>
						Отменить
					</AppButton>
					<AppButton
						onPress={saveHandler}
					>
						Сохранить
					</AppButton>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1, // высота по всему окну
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_COLOR,
		borderBottomWidth: 2,
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})

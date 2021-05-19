import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export const NavBar = ({title}) => { // из props сразу достать
	return (
		<View style={styles.navbar}>
			<Text style={styles.text}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		// display: flex + flex-direction: column - по умолчанию
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		backgroundColor: '#3949ab',
		paddingBottom: 10
	},
	text: {
		color: 'white',
		fontSize: 20
	}
})

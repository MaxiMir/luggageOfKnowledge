import React from 'react'
import {StyleSheet, View} from 'react-native'

// ...styles.default, ...props.style - мержим стили

export const AppCard = props => (
	<View style={{...styles.default, ...props.style}}>
		{props.children}
	</View>
)

const styles = StyleSheet.create({
	default: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		shadowColor: '#000', // тень iOS ONLY
		shadowRadius: 2, // тень iOS ONLY
		shadowOpacity: 0.3, // тень iOS ONLY
		shadowOffset: {width: 2, height: 2}, // тень iOS ONLY
		elevation: 8, // тень Android ONLY
		backgroundColor: '#fff',
		borderRadius: 10
	}
})

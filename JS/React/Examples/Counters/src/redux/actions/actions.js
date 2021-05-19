import {ADD, ADD2, ADD_NUMBER, SUB} from './actionTypes'

export function add() {
	return {
		type: ADD
	}
}

export function sub() {
	return {
		type: SUB
	}
}

export function addNumber(number) {
	return {
		type: ADD_NUMBER,
		payload: number
	}
}

export function asyncAdd(number) {
	return (dispatch) => { // для async (dispatch)
		setTimeout(() => {
			dispatch(addNumber(number))
		}, 3000)
	}
}

export function add2(number) {
	return {
		type: ADD2,
		payload: number
	}
}

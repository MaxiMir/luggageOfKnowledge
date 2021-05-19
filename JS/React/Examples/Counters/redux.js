const redux = requie('redux')

// первоначальный Store:
const initialState = {
	counter: 0
}

// Reducer - изменяет Store
const reducer = (state = initialState, action) => {
	if (action.type === 'ADD') {
		return { // новый state
			counter: state.counter + 1
		}
	}

	if (action.type === 'SUB') {
		return { // новый state
			counter: state.counter - 1
		}
	}

	if (action.type === 'ADD_NUMBER') {
		return { // новый state
			counter: state.counter + action.value
		}
	}

	return state
}

// Store - весь state приложения
const store = redux.createStore(reducer) // принимает reducer

// Actions
const addCounter = {
	type: 'ADD' // обязательное поле
}

const subCounter = {
	type: 'SUB' // обязательное поле
}

const addNumber = {
	type: 'ADD_NUMBER', // обязательное поле
	value: 7
}


store.subscribe(() => { // вызывается при изменении Store
	console.log(store.getState())
	// -> {counter: 0}
	// -> {counter: 1}
	// -> {counter: 0}
	// -> {counter: 7}
})


store.getState()
store.dispatch(addCounter) // дергаем action
store.getState()
store.dispatch(subCounter) // дергаем action
store.getState()
store.dispatch(addNumber) // дергаем action
store.getState()


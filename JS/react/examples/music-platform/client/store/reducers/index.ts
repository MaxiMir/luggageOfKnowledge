import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import { playerReducer } from './playerReducer'
import { trackReducer } from './trackReducer'

const rootReducer = combineReducers({
	player: playerReducer,
	track: trackReducer,
})

export const reducer = (state, action) => {
	if (action.type !== HYDRATE) {
		return rootReducer(state, action)
	}

	const nextState = {
		...state, // use previous state
		...action.payload, // apply delta from hydration
	}

	if (state.count) {
		nextState.count = state.count // preserve count value on client side navigation
	}

	return nextState
}

export type RootState = ReturnType<typeof rootReducer>

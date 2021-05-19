import {combineReducers} from 'redux'

import counter1 from './reducers/counter1'
import counter2 from './reducers/counter2'

export default combineReducers({ // combineReducers - объединяет редьюсеры
	counter1, counter2
})

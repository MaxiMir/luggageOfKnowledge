import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk' // библиотека для асинхронных диспатчей стейта
import rootReducer from './redux/rootReducer'

// function loggerMiddleware(store) {
//   return function(next) {
//     return function(action) {
//       const result = next(action)
//       console.log('Middleware', store.getState())
//       return result
//     }
//   }
// }


// Для расширения Chrome:
const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		}) : compose; // compose -  встроенная функция в redux

const loggerMiddleware = store => next => action => {
	const result = next(action)
	console.log('Middleware', store.getState()) // например: {type: "SUB"} | {type: "ADD"}
	return result
}

const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(loggerMiddleware, reduxThunk) // applyMiddleware - передаем middleware - которые хотим использовать
		// передаем reduxThunk
	)
)

const app = (
	<Provider store={store}>
		<App/>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

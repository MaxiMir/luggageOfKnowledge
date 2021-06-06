import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import SettingBar from "./components/SettingBar"
import Toolbar from "./components/Toolbar"
import Canvas from "./components/Canvas"
import "./styles/app.scss"

const App = () => (
	<BrowserRouter>
		<div className="app">
			<Switch>
				<Route path='/:id'>
					<Toolbar/>
					<SettingBar/>
					<Canvas/>
				</Route>
				<Redirect to={`f${(+new Date).toString(16)}`}/>
			</Switch>
		</div>
	</BrowserRouter>
)

export default App

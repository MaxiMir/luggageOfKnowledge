import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from './containers/Quiz/Quiz'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import {connect} from 'react-redux' // hoc
import Logout from './components/Logout/Logout'
import {autoLogin} from './store/actions/auth';

class App extends Component {

	componentDidMount() {
		this.props.autoLogin() // action из state с помощью mapDispatchToProps
	}

	render() {

		let routes = (
			<Switch>
				<Route path="/auth" component={Auth}/>
				<Route path="/quiz/:id" component={Quiz}/>
				<Route path="/" exact component={QuizList}/>
				<Redirect to="/"/>
			</Switch>
		)

		if (this.props.isAuthenticated) { // данные из state с помощью mapStateToProps
			routes = (
				<Switch>
					<Route path="/quiz-creator" component={QuizCreator}/>
					<Route path="/quiz/:id" component={Quiz}/>
					<Route path="/logout" component={Logout}/>
					<Route path="/" exact component={QuizList}/>
					<Redirect to="/"/>
				</Switch>
			)
		}

		return (
			<Layout>
				{routes}
			</Layout>
		)
	}
}

function mapStateToProps(state) { // данные из store добавляем в props для работы
	return {
		isAuthenticated: !!state.auth.token
	}
}

function mapDispatchToProps(dispatch) { // добавляем action из store в props для работы
	return {
		autoLogin: () => dispatch(autoLogin()),
		//...
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)) // используем connect

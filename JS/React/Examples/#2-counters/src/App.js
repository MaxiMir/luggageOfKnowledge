import React, {Component} from 'react'
import {connect} from 'react-redux'
import './App.scss'
import Counter from './Counter'
import {add, sub, addNumber, asyncAdd} from './redux/actions/actions';

class App extends Component {

  render() {
    return (
      <div className={'App'}>
        <h1>Счетчик <strong>{this.props.counter}</strong></h1>

        <hr/>

        <div className="Actions">
          <button onClick={this.props.onAdd}>Добавить 1</button>
          <button onClick={this.props.onSub}>Вычесть 1</button>
        </div>

        <div className="Actions">
          <button onClick={() => this.props.onAddNumber(15)}>Добавить 15</button>
          <button onClick={() => this.props.onAddNumber(-17)}>Вычесть 17</button>
        </div>

        <div className="Actions">
          <button onClick={() => this.props.onAsyncAdd(100)}>
            Асинхронно добавить 100
          </button>
        </div>

        <Counter />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter1.counter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch(add()),
    onSub: () => dispatch(sub()),
    onAddNumber: number => dispatch(addNumber(number)),
    onAsyncAdd: number => dispatch(asyncAdd(number))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

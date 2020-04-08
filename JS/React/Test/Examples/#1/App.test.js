import React from 'react'
import {configure, shallow} from 'enzyme' // для конфигурации adapter | shallow - для рендеринга компонентов
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

configure({
  adapter: new Adapter()
})

describe('<App />', () => { // из библиотеки Jest
  let wrapper

  beforeEach(() => { // выполняется перед каждым it
    const wrapper = shallow(<App />) // wrapper - отрендеренный компонент
  })

  it('Should render 3 characters in light side', () => { // из библиотеки Jest
    expect(wrapper.find(Character)).toHaveLenght(3) // ожидаем 3 компонента Character
  })

  it('Should render 2 characters in dark side', () => { // из библиотеки Jest
    wrapper.setProps({ // передает props в App
      side: 'dark'
    })

    expect(wrapper.find(Character)).toHaveLenght(2) // ожидаем 3 компонента Character
  })
})


// $ yarn test # запуск тестов

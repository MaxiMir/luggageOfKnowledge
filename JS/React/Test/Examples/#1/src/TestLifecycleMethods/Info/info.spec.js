import React from 'react'
import Info from './info'

// на каждый метод жизненных циклов вещаем шпиона:
const componentDidMountSpy = jest.spyOn(Info.prototype, 'componentDidMount')
const componentDidUpdateSpy = jest.spyOn(Info.prototype, 'componentDidUpdate')
const componentWillUnmountSpy = jest.spyOn(Info.prototype, 'componentWillUnmount')

const setUp = () => shallow(<Info/>)

describe('Info component', () => {
  let component

  beforeEach(() => {
    jest.spyOn(window, 'addEventListener')  // вешаем шпионы на события
    jest.spyOn(window, 'removeEventListener') // вешаем шпионы на события
    component = setUp()
  })

  afterEach(() => {
    window.addEventListener.mockRestore() // сбрасывает замоканные реализации в начальное состояние
    window.removeEventListener.mockRestore()
  })

  it('should render Info component', () => {
    expect(component).toMatchSnapshot()
  })

  describe('Lifecycle methods', () => {
    it('should call componentDidMount once', () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1)
    })

    it('should not call componentWillUnmount when component just mounted', () => {
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1)
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(0)
    })

    it('should call componentDidUpdate', () => {
      component.setProps()
      expect(componentDidUpdateSpy).toHaveBeenCalled()
    })

    it('should call componentWillUnmount', () => {
      component.unmount()
      expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Component handlers', () => {
    it('should call addEventListener when component mounted', () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(1)
    })

    it('should call handleChangeTitle in componentDidUpdate', () => {
      const instance = setUp().instance()

      instance.handleChangeTitle = jest.fn()
      instance.componentDidUpdate()

      expect(instance.handleChangeTitle).toHaveBeenCalled()
    })

    it('should call removeEventListener when component unmounted', () => {
      component.unmount() // делаем unmount компонент

      expect(window.removeEventListener).toHaveBeenCalledTimes(1)
    })

    it('should call handleWidth during window resize', () => {
      expect(component.state().width).toBe(0)
      global.dispatchEvent(new Event('resize')) // эмулируем resize window
      expect(component.state().width).toBe(window.innerWidth)
    })
  })
})

import React from 'react'
import Post from './post'

// shallow - осуществляет поверхностную отрисовку компонента (Enzyme)
const setUp = props => shallow(<Post {...props} />)

describe('should render Post component', () => {
	let component

	beforeEach(() => { // перед запуском каждого из тестов
		component = setUp()
	})

	it('should contain .post wrapper', () => {
		const wrapper = component.find('.post')

		console.log(component.debug()) // debug - посмотреть разметку в component

		expect(wrapper.length).toBe(1) // компонент встречается 1 раз
	})

	it('should contain link', () => {
		const wrapper = component.find('a') // компонент содержит ссылку

		expect(wrapper.length).toBe(1)
	})

	it('should render created date', () => {
		const created_at = '01-03-2020'
		component = setUp({created_at})
		const date = component.find('.date')

		expect(date.text()).toBe(new Date(created_at).toLocaleDateString())
	})
})

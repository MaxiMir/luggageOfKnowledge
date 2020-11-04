import React from 'react'
import Posts from './posts'

describe('Posts component', () => {
  it('should render Post component', () => {
    const component = render(<Posts/>)

    expect(component).toMatchSnapshot() // получение Snapshot-а
  })
})

// Для обновление Snapshot $npm test -u

import React from 'react'

import { HeaderTopBar } from './HeaderTopBar/HeaderTopBar'
import { HeaderMiddleBar } from './HeaderMiddleBar/HeaderMiddleBar'
import { HeaderBottomBar } from './HeaderBottomBar/HeaderBottomBar'


export const Header = () => {
  return (
    <header>
      <HeaderTopBar/>
      <HeaderMiddleBar/>
      <HeaderBottomBar/>
    </header>
  )
}

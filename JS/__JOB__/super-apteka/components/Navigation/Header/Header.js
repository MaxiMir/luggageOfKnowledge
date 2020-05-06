import React from 'react'

import { HeaderTopBar } from './HeaderTopBar/HeaderTopBar'
import { HeaderMiddleBar } from './HeaderMiddleBar/HeaderMiddleBar'
import { HeaderBottomBar } from './HeaderBottomBar/HeaderBottomBar'
import { HeaderMainNav } from './HeaderMainNav/HeaderMainNav'


export const Header = () => {
  return (
    <header>
      <HeaderTopBar/>
      <HeaderMiddleBar/>
      <HeaderBottomBar/>
      <HeaderMainNav/>
    </header>
  )
}



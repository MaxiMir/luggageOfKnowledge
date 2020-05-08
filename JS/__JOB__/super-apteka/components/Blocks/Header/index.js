import React from 'react'

import { HeaderTopBar } from './HeaderTopBar/'
import { HeaderMiddleBar } from './HeaderMiddleBar/'
import { HeaderBottomBar } from './HeaderBottomBar/'


export const Header = () => {
  return (
    <header>
      <HeaderTopBar/>
      <HeaderMiddleBar/>
      <HeaderBottomBar/>
    </header>
  )
}

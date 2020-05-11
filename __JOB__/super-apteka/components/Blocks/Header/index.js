import React from 'react'

import { HeaderTopBar } from './HeaderTopBar/'
import { HeaderMiddleBar } from './HeaderMiddleBar/'
import { HeaderBottomBar } from './HeaderBottomBar/'


export const Header = props => {
  const { region, pharmacyPhone, pharmacyAddress, user } = props

  return (
    <header>
      <HeaderTopBar
        region={ region }
        pharmacyPhone={ pharmacyPhone }
        pharmacyAddress={ pharmacyAddress }
        user={ user }
      />
      <HeaderMiddleBar/>
      <HeaderBottomBar/>
    </header>
  )
}

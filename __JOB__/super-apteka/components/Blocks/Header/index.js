import React from 'react'

import { HeaderTopBar } from './HeaderTopBar/'
import { HeaderMiddleBar } from './HeaderMiddleBar/'
import { HeaderBottomBar } from './HeaderBottomBar/'


export const Header = props => {
  const { host, region, pharmacyPhone, pharmacyAddress, user } = props

  return (
    <header>
      <HeaderTopBar
        region={ region }
        pharmacyPhone={ pharmacyPhone }
        pharmacyAddress={ pharmacyAddress }
        user={ user }
      />
      <HeaderMiddleBar
        host={ host }
      />
      <HeaderBottomBar/>
    </header>
  )
}

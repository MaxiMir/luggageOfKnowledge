import React from 'react';
import { AppRouterLink } from '../../../UI/AppRouterLink'


export const HeaderMainNav = () => {
  const NavLinksData = [

  ]


  return (
    <div className="container">
      <div className="row">
        <nav>
          <AppRouterLink href='/stock'>Акции</AppRouterLink>
        </nav>
      </div>
    </div>
  )
}

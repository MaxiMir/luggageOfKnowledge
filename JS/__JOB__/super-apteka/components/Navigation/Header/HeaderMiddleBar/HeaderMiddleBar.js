import React from 'react'
import styled from 'styled-components'

import { BasketWidget } from '../../../Basket/BasketWidget/BasketWidget'
import { AppRouterLink } from '../../../UI/AppRouterLink'
import { AppLogoIcon } from '../../../UI/Icons/AppLogoIcon'
import { AppPercentIcon } from '../../../UI/Icons/AppPercentIcon'
import { AppStarIcon } from '../../../UI/Icons/AppStarIcon'
import { AppBonusIcon } from '../../../UI/Icons/AppBonusIcon'
import { AppGoodsOnOrderIcon } from '../../../UI/Icons/AppGoodsOnOrderIcon'


const HeaderMainNavStyles = styled.div`
  padding-bottom: 15px;
`

export const HeaderMiddleBar = () => {
  const navLinksData = [
    { name: 'Акции', href: '/stock/', IconComponent: AppPercentIcon },
    { name: 'Наш выбор', href: '/catalog/nash-vibor/', IconComponent: AppStarIcon },
    { name: 'Бонусы', href: '/super/', IconComponent: AppBonusIcon },
    { name: 'Товары под заказ', href: '#???', IconComponent: AppGoodsOnOrderIcon },
  ]

  const navLinks = navLinksData.map(({ name, href, IconComponent }, id) => (
    <AppRouterLink href={ href } key={ id }>
      <IconComponent/>
      { name }
    </AppRouterLink>
  ))

  return (
    <HeaderMainNavStyles>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <AppRouterLink href="/" title="На главную">
              <AppLogoIcon/>
            </AppRouterLink>
          </div>

          <div className="col-6">
            <div className="d-flex align-items-center justify-content-between h-100">
              { navLinks }
            </div>
          </div>

          <div className="col-3 d-flex justify-content-end">
            <BasketWidget/>
          </div>
        </div>
      </div>
    </HeaderMainNavStyles>
  )
}

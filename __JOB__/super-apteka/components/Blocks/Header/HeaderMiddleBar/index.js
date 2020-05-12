import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { BasketWidget } from '../../../Basket/BasketWidget/'
import { AppRouterLink } from '../../../UI/AppRouterLink'
import { AppLogoIcon } from '../../../UI/Icons/AppLogoIcon'
import { AppPercentIcon } from '../../../UI/Icons/AppPercentIcon'
import { AppStarIcon } from '../../../UI/Icons/AppStarIcon'
import { AppBonusIcon } from '../../../UI/Icons/AppBonusIcon'
import { AppGoodsOnOrderIcon } from '../../../UI/Icons/AppGoodsOnOrderIcon'
import { THEME } from '../../../../theme'


const HeaderMiddleBarSection = styled.div`
  padding-bottom: 15px;
`

const LogoText = styled.span`
  font-size: 24px;
  color: ${ THEME.LOGO_TEXT_COLOR };
`

export const HeaderMiddleBar = ({ host }) => {
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
    <HeaderMiddleBarSection>
      <Container>
        <Row>
          <div className="col-3 d-flex align-items-center">
            <AppRouterLink href="/" title="На главную">
              <AppLogoIcon/>
              <LogoText>{ host }</LogoText>
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
        </Row>
      </Container>
    </HeaderMiddleBarSection>
  )
}


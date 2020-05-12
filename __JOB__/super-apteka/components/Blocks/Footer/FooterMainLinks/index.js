import React from 'react'
import styled from 'styled-components'

import { AppRouterLink } from '../../../UI/AppRouterLink'
import { THEME } from '../../../../theme'


const FooterLinksColumn = styled.div`
  height: 84px;
  :first-child {
    margin-right: 50px;
  }
`

const FooterLink = styled(AppRouterLink)`
  color: ${ THEME.GREY_COLOR }!important;
  font-weight: bold;
`

export const FooterMainLinks = () => {
  const [linksFirstColumnData, linksSecondColumnData] = [
    [
      { name: 'О компании', href: '/#1' },
      { name: 'Контакты', href: '/#2' },
      { name: 'Аптеки', href: '/#3' },
    ],
    [
      { name: 'Акции', href: '/#4' },
      { name: 'FAQ', href: '/#5' },
      { name: 'Карта сайта', href: '/#6' },
    ]
  ]

  const linksFirstColumn = linksFirstColumnData.map(({ name, href }) => (
    <FooterLink href={ href } key={ href }>{ name }</FooterLink>
  ))

  const linksSecondColumn = linksSecondColumnData.map(({ name, href }) => (
    <FooterLink href={ href } key={ href }>{ name }</FooterLink>
  ))

  return (
    <div className="d-flex justify-content-between">
      <FooterLinksColumn className="d-flex flex-column">
        { linksFirstColumn }
      </FooterLinksColumn>
      <FooterLinksColumn className="d-flex flex-column">
        { linksSecondColumn }
      </FooterLinksColumn>
    </div>
  )
}

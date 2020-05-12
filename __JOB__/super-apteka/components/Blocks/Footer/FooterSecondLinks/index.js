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
  color: ${ THEME.LIGHT_GREY_COLOR }!important;
`

export const FooterSecondLinks = () => {
  const [linksFirstColumnData, linksSecondColumnData] = [
    [
      { name: 'Правила интернет-бронирования', href: '/#1' },
      { name: 'Пользовательское соглашение', href: '/#2' },
      { name: 'Реквизиты и лицензии', href: '/#3' },
    ],
    [
      { name: 'Поставщики', href: '/#4' },
      { name: 'Отзывы', href: '/#5' },
      { name: 'Правила программы лояльности', href: '/#6' },
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

import React from 'react';
import styled from 'styled-components'

import { AppLogoIcon } from '../../../UI/Icons/AppLogoIcon'
import { THEME } from '../../../../theme'


const CopyrightText = styled.div`
  font-size: 12px;
  color: ${ THEME.GREY_COLOR };
`

export const FooterCopyright = ({ host }) => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()

  return (
    <CopyrightText className="d-flex align-items-center">
      <AppLogoIcon isColored={ false } isSmallSize={ true }/>
      { `© ${ year } ${ host } Все права защищены` }
    </CopyrightText>
  )
}

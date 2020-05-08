import React from 'react'
import styled from 'styled-components'

import { FooterContacts } from './FooterContacts/'
import { THEME } from '../../../theme'


const FooterStyled = styled.div`
  padding: 20px;
  background-color: ${ THEME.BACKGROUND_COLOR };
`

export const Footer = () => {
  return (
    <FooterStyled className="footer mt-auto">
      <div className="container">
        <FooterContacts/>


      </div>
    </FooterStyled>
  )
}


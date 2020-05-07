import React from 'react'
import styled from 'styled-components'

import { FooterContacts } from './FooterContacts/FooterContacts'
import { THEME } from '../../../theme'


const FooterStyles = styled.div`
  padding: 20px;
  background-color: ${ THEME.BACKGROUND_COLOR };
`


export const Footer = () => {
  return (
    <FooterStyles className="footer mt-auto">
      <div className="container">
        <FooterContacts />
      </div>
    </FooterStyles>
  )
}

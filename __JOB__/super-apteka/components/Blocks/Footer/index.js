import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { FooterContacts } from './FooterContacts/'
import { THEME } from '../../../theme'


const FooterStyled = styled.div`
  padding: 20px;
  background-color: ${ THEME.BACKGROUND_COLOR };
`

export const Footer = () => {
  return (
    <FooterStyled>
      <Container>
        <Row>
          <FooterContacts/>
        </Row>
      </Container>
    </FooterStyled>
  )
}


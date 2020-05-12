import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { FooterContacts } from './FooterContacts'
import { FooterMainLinks } from './FooterMainLinks'
import { FooterSecondLinks } from './FooterSecondLinks'
import { FooterCopyright } from './FooterCopyright'
import { THEME } from '../../../theme'


const FooterSection = styled.div`
  padding: 28px 0;
  background-color: ${ THEME.BACKGROUND_COLOR };
`

export const Footer = ({ host, pharmacyPhone }) => {
  return (
    <FooterSection>
      <Container>
        <Row className="justify-content-between">
          <FooterContacts pharmacyPhone={ pharmacyPhone }/>
          <FooterMainLinks/>
          <FooterSecondLinks/>
        </Row>

        <Row>
          <FooterCopyright host={ host }/>
        </Row>
      </Container>
    </FooterSection>
  )
}


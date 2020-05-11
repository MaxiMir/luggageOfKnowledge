import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { UserAuthPanel } from '../../../User/UserAuthPanel'
import { AppPhone } from '../../../UI/AppPhone'
import { AppLink } from '../../../UI/AppLink'
import { AppLocationIcon } from '../../../UI/Icons/AppLocationIcon'
import { AppChevronIcon } from '../../../UI/Icons/AppChevronIcon'
import { AppCrossIcon } from '../../../UI/Icons/AppCrossIcon'
import { THEME } from '../../../../theme'


const HeaderTopBarStyles = styled.div`
  background-color: ${ THEME.BACKGROUND_COLOR };
  padding-top: 14px;
  padding-bottom: 10px;
  margin-bottom: 15px;
`

const LabelStyles = styled.span`
  color: ${ THEME.LABEL_FONT_COLOR };
  margin-right: 10px;
  font-weight: bold;
  font-size: 9px;
  line-height: 13px;
  text-transform: uppercase;
`

const SpanLinkStyles = styled.span`
  margin-right: 5px
`

export const HeaderTopBar = ({ region, pharmacyPhone, pharmacyAddress, user }) => {
  return (
    <HeaderTopBarStyles>
      <Container>
        <Row>
          <div className="col d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <AppPhone
                phone={ pharmacyPhone }
                withIcon={ true }
              />
            </div>

            <div className="d-flex align-items-center">
              <LabelStyles>регион</LabelStyles>

              <AppLink>
                <AppLocationIcon/>
                <SpanLinkStyles>{ region }</SpanLinkStyles>
                <AppChevronIcon/>
              </AppLink>
            </div>

            <div className="d-flex align-items-center">
              <LabelStyles>аптека</LabelStyles>

              <AppLink>
                <AppCrossIcon/>
                <SpanLinkStyles>{ pharmacyAddress }</SpanLinkStyles>
                <AppChevronIcon/>
              </AppLink>
            </div>
          </div>

          <UserAuthPanel user={ user }/>
        </Row>
      </Container>
    </HeaderTopBarStyles>
  )
}

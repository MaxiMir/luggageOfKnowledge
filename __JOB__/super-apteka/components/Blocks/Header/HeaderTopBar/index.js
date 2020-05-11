import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { AppPhone } from '../../../UI/AppPhone'
import { AppLink } from '../../../UI/AppLink'
import { AppLocationIcon } from '../../../UI/Icons/AppLocationIcon'
import { AppChevronIcon } from '../../../UI/Icons/AppChevronIcon'
import { AppCrossIcon } from '../../../UI/Icons/AppCrossIcon'
import { AppEnterIcon } from '../../../UI/Icons/AppEnterIcon'
import { AppPhoneIcon } from '../../../UI/Icons/AppPhoneIcon'
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

export const HeaderTopBar = () => {
  return (
    <HeaderTopBarStyles>
      <Container>
        <Row>
          <div className="col d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <AppPhoneIcon

              />
              <AppPhone phone="+7 (495) 122-22-82"/>
            </div>

            <div className="d-flex align-items-center">
              <LabelStyles>регион</LabelStyles>

              <AppLink>
                <AppLocationIcon/>
                <SpanLinkStyles>Москва</SpanLinkStyles>
                <AppChevronIcon/>
              </AppLink>
            </div>

            <div className="d-flex align-items-center">
              <LabelStyles>аптека</LabelStyles>

              <AppLink>
                <AppCrossIcon/>
                <SpanLinkStyles>Сумская улица, 2/12</SpanLinkStyles>
                <AppChevronIcon/>
              </AppLink>
            </div>
          </div>

          <div className="col d-flex justify-content-end">
            <div className="d-flex align-items-center mr-4">
              <AppLink>Зарегистрироваться</AppLink>
            </div>

            <div className="d-flex align-items-center">
              <AppLink>
                <AppEnterIcon/>
                Войти
              </AppLink>
            </div>
          </div>
        </Row>
      </Container>
    </HeaderTopBarStyles>
  )
}

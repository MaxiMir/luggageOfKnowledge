import React from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'

import { AppStoreIcon } from '../../../UI/Icons/AppStoreIcon'
import { AppGooglePlayIcon } from '../../../UI/Icons/AppGooglePlayIcon'
import { AppLink } from '../../../UI/AppLink';


const PromoDescriptionContainer = styled.div`
  height: 65px;
`

const PromoText = styled.div`
  font-size: 24px;
`

const IconsContainer = styled.div`
  width: 265px;
  margin-left: 20px;
`

export const PromoInstallApplication = () => (
  <Container>
    <Row className="d-flex align-items-end">
      <img src="/images/decoration/mobile.png" alt="Установите мобильное приложение супераптека"/>

      <PromoDescriptionContainer className="d-flex align-items-center">
        <PromoText>Установите мобильное приложение супераптека</PromoText>
        <IconsContainer className="d-flex justify-content-between">
          <AppLink href="https://apps.apple.com/" target="_blank">
            <AppStoreIcon />
          </AppLink>
          <AppLink href="https://play.google.com/" target="_blank">
            <AppGooglePlayIcon />
          </AppLink>
        </IconsContainer>
      </PromoDescriptionContainer>
    </Row>
  </Container>
)



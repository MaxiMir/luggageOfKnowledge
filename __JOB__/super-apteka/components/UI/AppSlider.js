import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import { THEME } from '../../theme'


const Caption = styled(Carousel.Caption)`
  max-width: 728px;
  height: 100%;
  padding: 20px 0;
  right: initial;
  bottom: 0;
`

const Header = styled.p`
  font-weight: 300;
  font-size: 72px;
  line-height: 107%;
  color: ${ THEME.WHITE_COLOR };
  text-align: left;
`

const ButtonLink = styled(Button)`
  width: 161px;
  height: 44px;
  border-radius: 10px;
  margin-bottom: 20px;
`

const Note = styled.p`
  font-size: 10px;
  line-height: 120%;
`

export const AppSlider = () => {
  const sliderData = [
    {
      img: '/mock/banner1.png',
      header: 'Доставка лекарств  на дом',
      buttonTitle: 'Начать покупки',
      buttonHref: '#??? ',
      note: 'Имеются противопоказания, требуется консультация специалиста. Правила и подробности доставки уточняйте на www. superapteka.ru'
    }
  ]


  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/mock/banner1.png" alt="First slide"/>
        <Caption className="d-flex flex-column align-items-start">
          <Header>{ sliderData[0].header }</Header>
          <ButtonLink variant="outline-light">{ sliderData[0].buttonTitle }</ButtonLink>
          <Note>{ sliderData[0].note }</Note>
        </Caption>
      </Carousel.Item>
    </Carousel>
  )
}

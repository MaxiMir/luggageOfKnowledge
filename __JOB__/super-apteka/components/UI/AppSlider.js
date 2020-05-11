import React from 'react'
import Router from 'next/router'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import { THEME } from '../../theme'
import { AppRouterLink } from './AppRouterLink';


const Caption = styled(Carousel.Caption)`
  max-width: 728px;
  height: 100%;
  padding: 20px 0;
  bottom: 0;
`

const ImgContainer = styled.div`
  height: 316px;
`

const Header = styled.p`
  font-weight: 300;
  font-size: 72px;
  line-height: 107%;
  color: ${ THEME.WHITE_COLOR };
  text-align: left;
  margin-bottom: 20px;
`

const ButtonLink = styled(Button)`
  width: 161px;
  height: 44px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
`

const Note = styled.div`
  max-width: 504px;
  font-size: 10px;
  line-height: 120%;
  text-align: left;
`

export const AppSlider = () => {
  const sliderData = [
    {
      id: '1',
      img: '/mock/banner1.png',
      header: 'Доставка лекарств  на дом',
      buttonTitle: 'Начать покупки',
      buttonHref: '/#??? ',
      note: 'Имеются противопоказания, требуется консультация специалиста. Правила и подробности доставки уточняйте на www. superapteka.ru'
    }
  ]

  const carouselItems = sliderData.map(slideData => (
    <Carousel.Item key={ slideData.id }>
      <ImgContainer>
        <img className="d-block w-100" src={ slideData.img } alt="First slide"/>
      </ImgContainer>
      <Caption className="d-flex flex-column align-items-start">
        <Header>{ slideData.header }</Header>
        <ButtonLink variant="outline-light" onClick={ () => Router.push(slideData.buttonHref) }>
          { slideData.buttonTitle }
        </ButtonLink>
        <Note>{ slideData.note }</Note>
      </Caption>
    </Carousel.Item>
  ))

  return (
    <Carousel>
      { carouselItems }
    </Carousel>
  )
}

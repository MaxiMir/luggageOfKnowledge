import React from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import currencyFilter from '../../../../filters/currency.filter'
import { AppRouterLink } from '../../../UI/AppRouterLink'
import { THEME } from '../../../../theme'


const Block = styled.div`
  width: 100%;
  max-width: 560px;
  min-height: 270px;
  padding: 20px 25px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.4) 2.46%, rgba(255, 255, 255, 0) 57.81%), ${ props => props.backgroundColor };
  border-radius: 10px;
  margin-bottom: 15px;
`

const HeaderBlock = styled.div`
  height: 40px;
  margin-bottom: 15px;
`

const SectionName = styled.p`
  font-size: 24px;
  color: ${ THEME.WHITE_COLOR };
  margin-bottom: 0;
`

const ShowAllButton = styled(AppRouterLink)`
  width: 108px;
  height: 30px;
  background: ${ THEME.WHITE_COLOR };
  border-radius: 10px;
  color: ${ props => props.color }!important;
`

const ImgContainer = styled.div`
  position: relative;
  min-width: 210px;
  margin-right: 20px;
`

const Img = styled.img`
  object-fit: contain;
  z-index: 100;
`

const ImgShadow = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 18px;
  background: ${ props => props.color };
  background-blend-mode: multiply;
  filter: blur(9px);
`

const Header = styled.p`
  font-size: 18px;
  color: ${ THEME.WHITE_COLOR };
  margin-bottom: 7px;
`

const Description = styled.p`
  font-size: 12px;
  color: ${ THEME.WHITE_COLOR };
  margin-bottom: 20px;
`

const Price = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${ THEME.WHITE_COLOR };
`

const ToBasketBtn = styled(Button)`
  width: 132px;
  height: 44px;
  font-size: 18px;
  border-width: 2px;
  border-radius: 10px;
`


export const PromoProduct = props => {
  const { id, name, description, price, img, sectionName, sectionURN, color } = props.data
  const displayedPrice = currencyFilter(price)

  return (
    <Block backgroundColor={ color } className="d-flex flex-column">
      <HeaderBlock className="d-flex align-items-center justify-content-between">
        <SectionName>{ sectionName }</SectionName>
        <ShowAllButton
          color={ color }
          href={ sectionURN }
          className="d-flex justify-content-center align-items-center"
        >
          Смотреть все
        </ShowAllButton>
      </HeaderBlock>

      <div className="d-flex">
        <ImgContainer className="d-flex justify-content-center">
          <Img src={ img } alt={ name }/>
          <ImgShadow color={ color }/>
        </ImgContainer>

        <div>
          <Header>{ name }</Header>
          <Description>{ description }</Description>

          <div className="d-flex align-items-center justify-content-between">
            <Price>{ displayedPrice }</Price>
            <ToBasketBtn variant="outline-light">В корзину</ToBasketBtn>
          </div>
        </div>
      </div>
    </Block>
  )
}

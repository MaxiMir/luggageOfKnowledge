import React from 'react'
import styled from 'styled-components'

import { AppBasketIcon } from '../../UI/Icons/AppBasketicon'
import { THEME } from '../../../theme'


const Block = styled.div`
  width: 200px;
  height: 56px;
  padding: 12px 33px 10px 34px;
  border: 2px solid #DADFE6;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
`

const CountBlock = styled.div`
  display: inline-block!important;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${ THEME.GREEN_COLOR };
  color: ${ THEME.WHITE_COLOR };
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  line-height: 37px;
`

export const BasketWidget = () => {
  const basketCount = 12;
  const backCountDisplayed = basketCount > 99 ? '99+' : basketCount

  return (
    <Block className="d-flex justify-content-between align-items-center">
      <div>Корзина</div>

      <AppBasketIcon/>

      <CountBlock>
        { backCountDisplayed }
      </CountBlock>
    </Block>
  )
}

import React from 'react'
import styled from 'styled-components'

import { AppBasketIcon } from '../../UI/Icons/AppBasketicon'
import { THEME } from '../../../theme'


const BasketWidgetContainerStyles = styled.div`
  width: 200px;
  height: 56px;
  padding: 12px 33px 10px 34px;
  border: 2px solid #DADFE6;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
`

const BasketCountContainerStyles = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${THEME.MAIN_COLOR};
  font-size: 18px;
  font-weight: bold;
  color: ${THEME.WHITE_COLOR};
`

export const BasketWidget = () => {
  const basketCount = 12;

  return (
    <BasketWidgetContainerStyles className="d-flex justify-content-between align-items-center">
      <div>Корзина</div>

      <AppBasketIcon />

      <BasketCountContainerStyles className="d-flex justify-content-center align-items-center">
        { basketCount }
      </BasketCountContainerStyles>
    </BasketWidgetContainerStyles>
  )
}

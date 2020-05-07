import React from 'react'

import { AppSvgContainer } from './AppSvgContainer'
import { THEME } from '../../../theme'


export const AppBurgerIcon = ({ color = THEME.WHITE_COLOR }) => (
  <AppSvgContainer
    width="13"
    height="13"
    viewBoxWidth="13"
    viewBoxHeight="13"
  >
    <rect
      y="0.0412598"
      width="15"
      height="2" rx="1"
      fill={ color }
    />
    <rect
      y="5.04126"
      width="15"
      height="2"
      rx="1"
      fill={ color }
    />
    <rect
      y="10.0413"
      width="15"
      height="2"
      rx="1"
      fill={ color }
    />
  </AppSvgContainer>
)

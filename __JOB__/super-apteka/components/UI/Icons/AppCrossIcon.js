import React from 'react'

import { AppSvgContainer } from './AppSvgContainer'
import { THEME } from '../../../theme'


export const AppCrossIcon = ({ color = THEME.MAIN_COLOR }) => (
    <AppSvgContainer
      width="14"
      height="14"
      viewBoxWidth="14"
      viewBoxHeight="14"
    >
      <rect
        y="5"
        width="14"
        height="4"
        rx="1"
        fill={ color }
      />
      <rect
        x="5"
        y="14"
        width="14"
        height="4"
        rx="1"
        transform="rotate(-90 5 14)"
        fill={ color }
      />
    </AppSvgContainer>
)


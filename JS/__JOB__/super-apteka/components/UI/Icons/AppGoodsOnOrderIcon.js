import React from 'react'

import { AppSvgContainer } from './AppSvgContainer'
import { THEME } from '../../../theme'


export const AppGoodsOnOrderIcon = ({ color = THEME.FONT_COLOR }) => (
  <AppSvgContainer
    width="24"
    height="24"
    viewBoxWidth="24"
    viewBoxHeight="24"
  >
    <path
      d="M1 5L12 9.34483V23L1 18.6552V5Z"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 5L12 1L23 5L12 9.5L1 5Z"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 5L12 9.34483V23L23 18.6552V5Z"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1119 7.92164L17.0336 8.30969L17.8097 6.46642L16.8881 6.07836L16.1119 7.92164ZM6.61194 3.92164L16.1119 7.92164L16.8881 6.07836L7.38806 2.07836L6.61194 3.92164Z"
      fill={ color }
    />
  </AppSvgContainer>
)

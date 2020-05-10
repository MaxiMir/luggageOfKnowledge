import React from 'react'

import { AppSvgContainer } from './AppSvgContainer'
import { THEME } from '../../../theme'


export const AppPercentIcon = ({ color = THEME.FONT_COLOR }) => (
  <AppSvgContainer
    width="20"
    height="20"
    viewBoxWidth="20"
    viewBoxHeight="20"
  >
    <circle
      cx="5"
      cy="5"
      r="4"
      stroke={ color }
      strokeWidth="2"
    />
    <path
      d="M19 15.0001C19 17.2092 17.2091 19.0001 15 19.0001C12.7909 19.0001 11 17.2092 11 15.0001C11 12.791 12.7909 11.0001 15 11.0001C17.2091 11.0001 19 12.791 19 15.0001Z"
      stroke={ color }
      strokeWidth="2"
    />
    <path
      d="M18.7071 2.70711C19.0976 2.31658 19.0976 1.68342 18.7071 1.29289C18.3166 0.902369 17.6834 0.902369 17.2929 1.29289L18.7071 2.70711ZM1.29289 17.2929C0.902369 17.6834 0.902369 18.3166 1.29289 18.7071C1.68342 19.0976 2.31658 19.0976 2.70711 18.7071L1.29289 17.2929ZM17.2929 1.29289L1.29289 17.2929L2.70711 18.7071L18.7071 2.70711L17.2929 1.29289Z"
      fill={ color }
    />
  </AppSvgContainer>
)

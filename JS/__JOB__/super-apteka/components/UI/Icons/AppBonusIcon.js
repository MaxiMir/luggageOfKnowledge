import React from 'react'

import { AppIconContainer } from './AppIconContainer'
import { THEME } from '../../../theme'


export const AppBonusIcon = ({ color = THEME.FONT_COLOR }) => (
  <AppIconContainer
    width="21"
    height="15"
    viewBoxWidth="21"
    viewBoxHeight="15"
  >
    <rect
      x="1"
      y="1"
      width="19"
      height="13" rx="2"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 6H20"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </AppIconContainer>
)


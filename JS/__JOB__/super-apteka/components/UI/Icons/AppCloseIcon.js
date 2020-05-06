import React from 'react'

import { AppIconContainer } from './AppIconContainer'
import { THEME } from '../../../theme'


export const AppCloseIcon = ({ color = THEME.WHITE_COLOR }) => (
  <AppIconContainer
    width="13"
    height="13"
    viewBoxWidth="13"
    viewBoxHeight="13"
  >
    <rect
      x="1.90393"
      width="15"
      height="2"
      rx="1"
      transform="rotate(45 1.90393 0)"
      fill={ color }
    />
    <rect
      width="15"
      height="2"
      rx="1"
      transform="matrix(-0.707107 0.707107 0.707107 0.707107 11.0964 0)"
      fill={ color }
    />
  </AppIconContainer>
)


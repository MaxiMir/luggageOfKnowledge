import React from 'react'

import { AppIconContainer } from './AppIconContainer'
import { THEME } from '../../../theme'


export const AppChevronIcon = ({ color = THEME.FONT_COLOR }) => (
  <AppIconContainer width="8" height="5" userHeight="8">
    <path
      d="M0.5 0.5L4.5 5.5L8.5 0.5"
      stroke={ color }
      strokeLinecap="round"
    />
  </AppIconContainer>
)

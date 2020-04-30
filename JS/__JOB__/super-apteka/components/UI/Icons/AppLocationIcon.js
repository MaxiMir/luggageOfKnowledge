import React from 'react'

import { AppIconContainer } from './AppIconContainer'
import { THEME } from '../../../theme'


export const AppLocationIcon = ({ color = THEME.MAIN_COLOR }) => (
  <AppIconContainer>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 14C5 14 10 9 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 9 5 14 5 14ZM5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z"
      fill={ color }
    />
  </AppIconContainer>
)

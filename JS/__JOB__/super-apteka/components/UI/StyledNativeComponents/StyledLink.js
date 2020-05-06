import React from 'react'
import styled from 'styled-components'

import { THEME } from '../../../theme'


export const StyledLink = styled.a`
  cursor: pointer;
  color: ${ THEME.FONT_COLOR };
  &:hover {
    color: ${ THEME.FONT_COLOR };
    text-decoration: none;
  }
`

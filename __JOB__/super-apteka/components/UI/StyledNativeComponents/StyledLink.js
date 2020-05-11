import React from 'react'
import styled from 'styled-components'

import { THEME } from '../../../theme'


export const StyledLink = styled.a`
  line-height: initial;
  cursor: pointer;
  color: ${ props => props.color || THEME.FONT_COLOR };
  font-size: ${ props => props.size || THEME.FONT_SIZE };
  &:hover {
    color: ${ props => props.color || THEME.FONT_COLOR };
    text-decoration: none;
  }
`

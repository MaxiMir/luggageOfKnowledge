import React from 'react'
import styled from 'styled-components'

import { THEME } from '../../theme'

const StyledLink = styled.a`
  cursor: pointer;
  color: ${ THEME.FONT_COLOR };
  :hover {
    color: ${ THEME.FONT_COLOR };
    text-decoration: none;
  }
`

export const AppLink = ({ children, ...rest }) => (
  <StyledLink { ...rest } className="d-flex align-items-center">
    { children }
  </StyledLink>
)

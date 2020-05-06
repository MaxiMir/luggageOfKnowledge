import React from 'react'

import { StyledLink } from './StyledNativeComponents/StyledLink'


export const AppLink = ({ children, ...rest }) => (
  <StyledLink className="d-flex align-items-center" { ...rest }>
    { children }
  </StyledLink>
)

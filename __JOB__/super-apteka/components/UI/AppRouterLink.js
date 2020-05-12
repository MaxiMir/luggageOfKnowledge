import React from 'react'
import Link from 'next/link'

import { StyledLink } from './StyledNativeComponents/StyledLink'


export const AppRouterLink = ({ href, children, ...rest }) => (
  <Link href={ href } >
    <StyledLink className="d-flex align-items-center" { ...rest }>
      { children }
    </StyledLink>
  </Link>
)

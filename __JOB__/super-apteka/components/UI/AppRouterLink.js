import React from 'react'
import Link from 'next/link'

import { StyledLink } from './StyledNativeComponents/StyledLink'


export const AppRouterLink = ({ href, children, ...rest }) => {
  return (
    <Link href={ href } >
      <StyledLink { ...rest } className="d-flex align-items-center">
        { children }
      </StyledLink>
    </Link>
  )
}

import React from 'react'
import Link from 'next/link'

import { AppLink } from './AppLink'


export const AppRouterLink = ({ href, children, ...rest }) => (
  <Link href={ href } { ...rest }>
    {/*<AppLink>*/}
      <a>{ children }</a>
    {/*</AppLink>*/}
  </Link>
)

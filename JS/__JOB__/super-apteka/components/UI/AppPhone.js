import React from 'react'

import { AppLink } from './AppLink';


export const AppPhone = ({ phone }) => (
  <AppLink href={ `tel:${ phone }` }>
    { phone }
  </AppLink>
)

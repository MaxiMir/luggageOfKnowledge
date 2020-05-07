import React from 'react'

import { AppLink } from './AppLink'


export const AppPhone = ({ phone, size, color }) => (
  <AppLink href={ `tel:${ phone }` } size={ size } color={ color }>
    { phone }
  </AppLink>
)

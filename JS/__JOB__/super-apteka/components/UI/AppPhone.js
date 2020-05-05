import React from 'react'

import { AppLink } from './AppLink'
import { AppPhoneIcon } from './Icons/AppPhoneIcon'


export const AppPhone = ({ phone, withIcon = true }) => (
  <AppLink href={ `tel:${ phone }` }>
    { withIcon && <AppPhoneIcon/> }
    { phone }
  </AppLink>
)

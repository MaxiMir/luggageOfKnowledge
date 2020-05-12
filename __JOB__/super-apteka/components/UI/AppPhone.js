import React from 'react'

import { AppLink } from './AppLink'
import { THEME } from '../../theme'
import { AppPhoneIcon } from './Icons/AppPhoneIcon';


export const AppPhone = ({ phone, size, color, withIcon = true, colorIcon = THEME.GREEN_COLOR, isSmallIcon = true }) => (
  <AppLink href={ `tel:${ phone }` } size={ size } color={ color }>
    { withIcon && <AppPhoneIcon color={ colorIcon } isSmallSize={ isSmallIcon } /> }
    { phone }
  </AppLink>
)

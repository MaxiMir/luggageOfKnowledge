import React from 'react'

import { AppPhone } from '../../../UI/AppPhone'
import { AppPhoneIcon } from '../../../UI/Icons/AppPhoneIcon'
import { THEME } from '../../../../theme'


export const FooterContacts = () => (
  <div className="d-flex flex-column">
    <AppPhone
      phone="+7 (495) 122-22-82"
      size="24px"
      color={ THEME.ICON_COLOR }
      withIcon={ true }
      isSmallIcon={ false }
      colorIcon={ THEME.ICON_COLOR }
    />

    <div>
      Написать нам
    </div>

    <div className="d-flex align-items-center">
      © 2020 superapteka.ru Все права защищены
    </div>
  </div>
)

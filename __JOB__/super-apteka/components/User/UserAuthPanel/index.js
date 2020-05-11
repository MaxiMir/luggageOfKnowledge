import React from 'react'

import { AppLink } from '../../UI/AppLink'
import { AppEnterIcon } from '../../UI/Icons/AppEnterIcon'


export const UserAuthPanel = ({ user }) => {
  return (
    <div className="col d-flex justify-content-end">
      <div className="d-flex align-items-center mr-4">
        <AppLink>Зарегистрироваться</AppLink>
      </div>

      <div className="d-flex align-items-center">
        <AppLink>
          <AppEnterIcon/>
          Войти
        </AppLink>
      </div>
    </div>
  )
}

import React from 'react'
import styled from 'styled-components'

import { AppPhone } from '../../../UI/AppPhone'
import { AppPhoneIcon } from '../../../UI/Icons/AppPhoneIcon'
import { AppLocationIcon } from '../../../UI/Icons/AppLocationIcon'
import { AppChevron } from '../../../UI/Icons/AppChevron'
import { THEME } from '../../../../theme'


const HeaderTopBarStyles = styled.div`
  background-color: ${ THEME.BACKGROUND_COLOR };
  padding-top: 14px;
  padding-bottom: 10px;
`

const RegionLabelStyles = styled.span`
  color: ${ THEME.LABEL_FONT_COLOR};
  margin-right: 5px;
  font-weight: bold;
  font-size: 9px;
  line-height: 13px;
  text-transform: uppercase;
`


export const HeaderTopBar = () => {
  return (
    <HeaderTopBarStyles>
      <div className='container'>
        <div className="row">
          <div className="col d-flex justify-content-between">
            <div>
              <AppPhoneIcon/>
              <AppPhone phone="+7 (495) 122-22-82"/>
            </div>

            <div className='region'>
              <RegionLabelStyles>
                регион
              </RegionLabelStyles>

              Москва

              <AppChevron />
            </div>

            <div>
              <RegionLabelStyles>
                аптека
              </RegionLabelStyles>

              <AppLocationIcon />

              Сумская улица, 2/12

              <AppChevron />
            </div>

          </div>
          <div className="col d-flex justify-content-end">
            <div>
              Зарегистрироваться
            </div>

            <div>
              Войти
            </div>
          </div>
        </div>
      </div>
    </HeaderTopBarStyles>
  )
}

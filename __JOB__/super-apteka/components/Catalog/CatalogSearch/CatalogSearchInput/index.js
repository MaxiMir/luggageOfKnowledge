import React from 'react'
import styled from 'styled-components'

import { AppSearchIcon } from '../../../UI/Icons/AppSearchIcon'
import { AppLink } from '../../../UI/AppLink'
import { THEME } from '../../../../theme'


const Input = styled.input`
  padding: 20px 12px;
  border: 2px solid ${ THEME.MAIN_COLOR };
  border-radius: 10px;
  font-size: 16px;
  line-height: 24px;
  color: ${ THEME.LABEL_FONT_COLOR };
  :focus: {

  }
`

const IconBlock = styled.div`
  width: 86px;
  height: 44px;
  background-color: ${ THEME.MAIN_COLOR };
  border-radius: 0px 10px 10px 0px;
`

export const CatalogSearchInput = () => {
  return (
    <div className="input-group">
      <Input
        type="text" className="form-control"
        placeholder="Искать по названию, действующему веществу или производителю"
        aria-label="Искать по названию, действующему веществу или производителю"
        aria-describedby="searchSubmit"
      />
      <IconBlock className="input-group-append d-flex justify-content-center align-items-center">
        <AppLink id="searchSubmit">
          <AppSearchIcon/>
        </AppLink>
      </IconBlock>
    </div>
  )
}

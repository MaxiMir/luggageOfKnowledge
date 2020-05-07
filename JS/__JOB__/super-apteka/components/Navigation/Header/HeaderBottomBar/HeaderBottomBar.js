import React, { useState } from 'react'
import styled from 'styled-components'

import { CatalogSearch } from '../../../Catalog/CatalogSearch/CatalogSearch'
import { HeaderPopupMenu } from './HeaderPopupMenu/HeaderPopupMenu'
import { AppBurgerIcon } from '../../../UI/Icons/AppBurgerIcon'
import { AppCloseIcon } from '../../../UI/Icons/AppCloseIcon'
import { AppLink } from '../../../UI/AppLink'
import { THEME } from '../../../../theme'


const HeaderBottomBarStyles = styled.div`
  padding-bottom: 15px;
`

const AppLinkContainerStyles = styled.div`
  width: 129px;
  height: 45px;
  margin-right: 20px;
  background: linear-gradient(270deg, #37BBEB 5.81%, #37BBEB 97.67%);
  color: ${ THEME.WHITE_COLOR };
  border-radius: 10px;
`

export const HeaderBottomBar = () => {
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);

  const menuPopupHandler = isOpenedMenu => {
    setIsOpenedMenu(isOpenedMenu)
  }

  const CatalogBtnIcon = isOpenedMenu ? AppCloseIcon : AppBurgerIcon

  return (
    <>
      <HeaderBottomBarStyles>
        <div className="container">
          <div className="row align-items-center">
            <AppLinkContainerStyles className="d-flex justify-content-center align-items-center">
              <AppLink data-toggle="modal" data-target=".header-modal-menu" onClick={ () => menuPopupHandler(!isOpenedMenu) }>
                <CatalogBtnIcon/>
                Каталог
              </AppLink>
            </AppLinkContainerStyles>

            <div className="flex-grow-1">
              <CatalogSearch/>
            </div>
          </div>
        </div>
      </HeaderBottomBarStyles>

      <HeaderPopupMenu
        isOpened={ isOpenedMenu }
      />
    </>
  )
}

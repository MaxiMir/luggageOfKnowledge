import React from 'react'
import styled from 'styled-components'

import { AppRouterLink } from '../../../UI/AppRouterLink'
import { AppMedicinesIcon } from '../../../UI/Icons/Catalog/AppMedicinesIcon'
import { AppMedicalEquipment } from '../../../UI/Icons/Catalog/AppMedicalEquipment'
import { AppNonCommodityItemsIcon } from '../../../UI/Icons/Catalog/AppNonCommodityItemsIcon'
import { AppOpticsIcon } from '../../../UI/Icons/Catalog/AppOpticsIcon'
import { AppFoodIcon } from '../../../UI/Icons/Catalog/AppFoodIcon'
import { AppBeautyAndHygieneProductsIcon } from '../../../UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon'
import { AppHouseholdProductsIcon } from '../../../UI/Icons/Catalog/AppHouseholdProductsIcon'
import { AppProductsForMotherAndBabyIcon } from '../../../UI/Icons/Catalog/AppProductsForMotherAndBabyIcon'
import { THEME } from '../../../../theme'


const LeftMenuStyles = styled.div`
  padding: 15px;
  background-color: ${ THEME.BACKGROUND_COLOR };
`

const RightMenuStyles = styled.div`
  padding: 15px;
`

const LeftMenuLinkContainer = styled.div`
  width: 200px;
  min-height: 60px;
  padding: 0 15px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${ THEME.WHITE_COLOR };
    color: ${ THEME.MAIN_COLOR };
  }
`

const IconContainer = styled.div`
  width: 44px;
`


export const HeaderMainNav = () => {
  const leftMenuLinksData = [
    { name: 'Лекарственные и профилактические средства', href: '#????', IconComponent: AppMedicinesIcon },
    { name: 'Медицинская техника и изделия', href: '#????', IconComponent: AppMedicalEquipment },
    { name: 'Нетоварные позиции', href: '#????', IconComponent: AppNonCommodityItemsIcon },
    { name: 'Оптика', href: '#????', IconComponent: AppOpticsIcon },
    { name: 'Продукты питания', href: '#????', IconComponent: AppFoodIcon },
    { name: 'Средства для красоты и гигиены', href: '#????', IconComponent: AppBeautyAndHygieneProductsIcon },
    { name: 'Товары для дома и сопутствующие', href: '#????', IconComponent: AppHouseholdProductsIcon },
    { name: 'Товары для матери и ребенка', href: '#????', IconComponent: AppProductsForMotherAndBabyIcon },
  ]

  const leftMenuLinks = leftMenuLinksData.map(({ name, href, IconComponent }, id) => (
    <LeftMenuLinkContainer key={ id }>
      <AppRouterLink href={ href }>
        <IconContainer className="d-flex justify-content-center align-items-center">
          <IconComponent/>
        </IconContainer>
        <div>{ name }</div>
      </AppRouterLink>
    </LeftMenuLinkContainer>
  ));


  return (
    <div className="container-fluid">
      <div className="row">
        <LeftMenuStyles className="col-3 flex-column justify-content-end align-items-end">
          <AppRouterLink href='/catalog/'>Все товары</AppRouterLink>
          { leftMenuLinks }
        </LeftMenuStyles>
        <RightMenuStyles className="col-9">

        </RightMenuStyles>
      </div>
    </div>
  )
}

import React from 'react'
import styled from 'styled-components'

import { AppRouterLink } from '../../../../../UI/AppRouterLink'
import { AppMedicinesIcon } from '../../../../../UI/Icons/Catalog/AppMedicinesIcon'
import { AppMedicalEquipment } from '../../../../../UI/Icons/Catalog/AppMedicalEquipment'
import { AppNonCommodityItemsIcon } from '../../../../../UI/Icons/Catalog/AppNonCommodityItemsIcon'
import { AppOpticsIcon } from '../../../../../UI/Icons/Catalog/AppOpticsIcon'
import { AppFoodIcon } from '../../../../../UI/Icons/Catalog/AppFoodIcon'
import { AppBeautyAndHygieneProductsIcon } from '../../../../../UI/Icons/Catalog/AppBeautyAndHygieneProductsIcon'
import { AppHouseholdProductsIcon } from '../../../../../UI/Icons/Catalog/AppHouseholdProductsIcon'
import { AppProductsForMotherAndBabyIcon } from '../../../../../UI/Icons/Catalog/AppProductsForMotherAndBabyIcon'
import { THEME } from '../../../../../../theme'


const LeftMenuStyles = styled.div`
  width: 320px;
  padding: 15px 0 15px 0;
  background-color: ${ THEME.BACKGROUND_COLOR };
`

const LeftMenuLinkContainerStyles = styled.div`
  width: 200px;
  height: 65px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${ THEME.WHITE_COLOR };
    color: ${ THEME.MAIN_COLOR };
  }
`

const IconContainerStyles = styled.div`
  width: 44px;
  height: 65px;
`
const TitleContainerStyles = styled.div`
  width: 156px;
  padding-right: 15px;
  ${ props => props.isHeader && `font-weight: bold;` }
`

export const HeaderPopupLeftMenu = () => {
  const leftMenuLinksData = [
    [
      { name: 'Все товары', href: '/', isHeader: true },
      { name: 'Лекарственные и профилактические средства', href: '#1', IconComponent: AppMedicinesIcon },
      { name: 'Медицинская техника и изделия', href: '#2', IconComponent: AppMedicalEquipment },
      { name: 'Нетоварные позиции', href: '#3', IconComponent: AppNonCommodityItemsIcon },
      { name: 'Оптика', href: '#4', IconComponent: AppOpticsIcon },
      { name: 'Продукты питания', href: '#5', IconComponent: AppFoodIcon },
      { name: 'Средства для красоты и гигиены', href: '#6', IconComponent: AppBeautyAndHygieneProductsIcon },
      { name: 'Товары для дома и сопутствующие', href: '#7', IconComponent: AppHouseholdProductsIcon },
      { name: 'Товары для матери и ребенка', href: '#8', IconComponent: AppProductsForMotherAndBabyIcon },
    ]
  ]

  const leftMenuLinks = leftMenuLinksData.map((sectionData, id) => {
    return sectionData.map(({ name, href, IconComponent, isHeader }) => (
      <LeftMenuLinkContainerStyles key={ href }>
        <AppRouterLink href={ href }>
          <IconContainerStyles className="d-flex justify-content-center align-items-center">
            { !IconComponent ? '' : <IconComponent/> }
          </IconContainerStyles>

          <TitleContainerStyles isHeader={ isHeader }>
            { name }
          </TitleContainerStyles>
        </AppRouterLink>
      </LeftMenuLinkContainerStyles>
    ))
  })

  return (
    <LeftMenuStyles className="d-flex justify-content-end">
      <div className="d-flex flex-column">
        { leftMenuLinks }
      </div>
    </LeftMenuStyles>
  )
}

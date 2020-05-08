import React from 'react'
import styled from 'styled-components'

import { AppRouterLink } from '../../../../../UI/AppRouterLink'
import { AppCloseIcon } from '../../../../../UI/Icons/AppCloseIcon'
import { THEME } from '../../../../../../theme'


const LeftMenu = styled.div`
  position: relative;
  max-height: 870px;
  padding: 20px 15px;
  overflow: auto;
  z-index: 1000;
`

const SectionsContainer = styled.div`
  float: left;
`

const SectionLinksContainer = styled.div`
  float: left;
  display: inline-block;
  width: 270px;
  margin-bottom: 20px;
  &:nth-child(3n+1) {
    clear: left;
  }
`

const TitleLink = styled.div`
  ${ props => props.isHeader && `
    margin-bottom: 10px;
    font-weight: bold;
  ` }
`

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 385px;
  cursor: pointer;
`

export const HeaderPopupRightMenu = ({ closeBtnHandler }) => {
  const rightMenuLinksData = [
    [
      { name: 'Аптечки', href: '/', isHeader: true },
      { name: 'Аптечки автомобильные', href: '#????' },
      { name: 'Аптечки универсальные', href: '#????' },
    ],
    [
      { name: 'Дезинфицирующие средства', href: '/', isHeader: true },
      { name: 'Диагностические тест-системы', href: '#????' },
      { name: 'Тесты на беременность', href: '#????' },
      { name: 'Тесты на наркотики и алкоголь', href: '#????' },
      { name: 'Тесты на овуляцию', href: '#????' },
    ],
    [
      { name: 'Экспресс-диагностика', href: '#????', isHeader: true },
    ],
    [
      { name: 'Изделия мед назначения', href: '#????', isHeader: true },
      { name: 'Беруши и маски для сна', href: '#????' },
      { name: 'Гинекологические изделия', href: '#????' },
      { name: 'Для инъекций и инфузий', href: '#????' },
      { name: 'Для охлаждения и согревания', href: '#????' },
      { name: 'Для спринцевания и катетеризации', href: '#????' },
      { name: 'Контейнеры для биоматериала', href: '#????' },
      { name: 'Одноразовая одежда и средства защиты', href: '#????' },
      { name: 'Перчатки и напальчники', href: '#????' },
      { name: 'Пипетки', href: '#????' },
      { name: 'Презервативы для УЗИ', href: '#????' },
    ],
    [
      { name: 'Медицинская одежда', href: '#????', isHeader: true },
      { name: 'Хирургические костюмы', href: '#????' },
    ],
    [
      { name: 'Медицинская техника', href: '#????', isHeader: true },
      { name: 'Адаптеры питания', href: '#????' },
      { name: 'Для прогревания', href: '#????' },
      { name: 'Ингаляторы и небулайзеры', href: '#????' },
      { name: 'Инъекционные помпы', href: '#????' },
      { name: 'Ирригаторы', href: '#????' },
      { name: 'Контроль сахарного диабета', href: '#????' },
      { name: 'Контроль свертывания крови', href: '#????' },
      { name: 'Косметические приборы', href: '#????' },
      { name: 'Массажеры', href: '#????' },
      { name: 'Приборы для стерилизации и обеззараживания', href: '#????' },
      { name: 'Слуховые аппараты и комплектующие', href: '#????' },
      { name: 'Спирометры и пикфлуометры', href: '#????' },
      { name: 'Стетоскопы и фонендоскопы', href: '#????' },
      { name: 'Термометры медицинские', href: '#????' },
      { name: 'Тонометры', href: '#????' },
      { name: 'Электро- и магнитотерапевтические приборы и комплектующие', href: '#????' },
    ],
    [
      { name: 'Медицинские инструменты', href: '#????', isHeader: true },
    ],
    [
      { name: 'Ортопедические предметы', href: '#????', isHeader: true },
      { name: 'Бандажи, пояса', href: '#????' },
      { name: 'Корсеты, корректоры осанки', href: '#????' },
      { name: 'Ортезы', href: '#????' },
      { name: 'Ортопедические принадлежности для ног', href: '#????' },
      { name: 'Подушки и матрасы ортопедические', href: '#????' },
    ],
    [
      { name: 'Перевязочные средства', href: '#????', isHeader: true },
      { name: 'Бинты гипсовые', href: '#????' },
      { name: 'Бинты эластичные и тейпы', href: '#????' },
      { name: 'Бинты, марля, салфетки марлевые', href: '#????' },
      { name: 'Жгуты кровоостанавлювающие', href: '#????' },
      { name: 'Клей типа БФ', href: '#????' },
      { name: 'Лейкопластыри', href: '#????' },
      { name: 'Повязки специальные', href: '#????' },
    ],
    [
      { name: 'Уход за больными', href: '#????', isHeader: true },
      { name: 'Кислородные баллоны, подушки, коктейли', href: '#????' },
      { name: 'Пеленки, простыни, клеенки', href: '#????' },
      { name: 'Подгузники для взрослых', href: '#????' },
      { name: 'Прокладки урологические', href: '#????' },
      { name: 'Профилактика пролежней', href: '#????' },
      { name: 'Средства реабилитации', href: '#????' },
      { name: 'Средства ухода за кожей и влажные салфетки для больных', href: '#????' },
      { name: 'Судна и мочеприемники', href: '#????' },
      { name: 'Таблетницы', href: '#????' },
    ],
    [
      { name: 'Функциональное белье', href: '#????', isHeader: true },
      { name: 'Компрессионный трикотаж и аксессуары', href: '#????' },
      { name: 'Пояса, корсеты, шорты для похудения', href: '#????' },
      { name: 'Согревающее белье и изделия', href: '#????' },
    ]
  ]

  const rightMenuLinks = rightMenuLinksData.map((sectionData, id) => {
    const sectionLinks = sectionData.map(({ name, href, isHeader }) => (
      <AppRouterLink href={ href } key={ name }>
        <TitleLink isHeader={ isHeader }>{ name }</TitleLink>
      </AppRouterLink>
    ))

    return (
      <SectionLinksContainer key={ id }>
        { sectionLinks }
      </SectionLinksContainer>
    )
  })

  return (
    <LeftMenu className="flex-grow-1">
      <SectionsContainer>
        { rightMenuLinks }
      </SectionsContainer>

      <CloseIconContainer>
        <AppCloseIcon color={ THEME.FONT_COLOR }/>
      </CloseIconContainer>
    </LeftMenu>
  )
}

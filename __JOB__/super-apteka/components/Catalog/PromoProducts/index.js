import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import { PromoProduct } from './PromoProduct'


const PromosSection = styled.div`
  margin-bottom: 15px;
`

export const PromoProducts = () => {
  const promoProductsData = [
    {
      id: '774',
      name: 'Нурофен Экспресс капсулы 200 мг, 24 шт.',
      description: 'Производитель: Рекитт Бенкизер, Великобритания Действующее вещество: Ибупрофен',
      price: '467',
      img: '/mock/product1.png',
      sectionName: 'Товар дня',
      sectionURN: '/#1',
      color: '#BF98FE'
    },
    {
      id: '772',
      name: 'Нурофен Экспресс капсулы 200 мг, 24 шт.',
      description: 'Производитель: Рекитт Бенкизер, Великобритания Действующее вещество: Ибупрофен',
      price: '467',
      img: '/mock/product1.png',
      sectionName: 'Хиты продаж',
      sectionURN: '/#2',
      color: '#37BAEB'
    },
    {
      id: '541',
      name: 'АнтиФлу Кидс, пакетики , 5 шт.',
      description: 'Производитель: Байер Фарма АГ, Германия Действующее вещество: Парацетамол, Хлорфенамин, [Аскорбиновая кислота]',
      price: '315',
      img: '/mock/product2.png',
      sectionName: 'Новинки',
      sectionURN: '/#3',
      color: '#60D67A'
    },
    {
      id: '123',
      name: 'Акку-Чек Актив Глюкометр (комплект с тест полосками)',
      description: 'Бренд: Акку-Чек',
      price: '795',
      img: '/mock/product4.png',
      sectionName: 'Медицинская техника',
      sectionURN: '/#4',
      color: '#B8BFC9'
    },
  ]

  const promos = promoProductsData.map(productData => <PromoProduct key={ productData.id } data={ productData }/>)

  return (
    <PromosSection>
      <Container>
        <Row className="justify-content-between">
          { promos }
        </Row>
      </Container>
    </PromosSection>
  )
}

import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { Header }  from '../components/Blocks/Header/'
import { PromoProducts } from '../components/Catalog/PromoProducts'
import { PromoInstallApplication } from '../components/Blocks/Main/PromoInstallApplication'
import { Footer } from '../components/Blocks/Footer/'


const MainStyled = styled.main`
  min-height: calc(100vh - 180px);
`

export const MainLayout = ({ children, title }) => {
  const pageData = {
    host: "superapteka.ru",
    region: "Москва",
    pharmacyPhone: "+7 (495) 122-22-82",
    pharmacyAddress: "Сумская улица, 2/12",
    user: null
  }

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Header
        host={ pageData.host }
        region={ pageData.region }
        pharmacyPhone={ pageData.pharmacyPhone }
        pharmacyAddress={ pageData.pharmacyAddress }
        user={ pageData.user }
      />

      <MainStyled role="main">
        { children }
        <PromoProducts />
        <PromoInstallApplication />
      </MainStyled>

      <Footer
        host={ pageData.host }
        pharmacyPhone={ pageData.pharmacyPhone }
      />
    </>
  )
}

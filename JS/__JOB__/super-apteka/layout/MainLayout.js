import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { Header }  from '../components/Blocks/Header/'
import { Footer } from '../components/Blocks/Footer/'


const MainStyled = styled.main`
  min-height: calc(100vh - 180px);
`

export const MainLayout = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <Header/>

      <MainStyled role="main">
        { children }
      </MainStyled>

      <Footer/>
    </>
  )
}

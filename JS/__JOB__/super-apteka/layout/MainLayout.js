import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import { Header } from '../components/Navigation/Header/Header'
import { Footer } from '../components/Navigation/Footer/Footer'


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

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>

      <Header/>

      <MainStyled role="main">
        { children }
      </MainStyled>

      <Footer/>
    </>
  )
}

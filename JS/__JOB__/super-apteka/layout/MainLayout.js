import React from 'react'
import Head from 'next/head'

import { Header } from '../components/Navigation/Header/Header'
import { Footer } from '../components/Navigation/Footer/Footer'

export const MainLayout = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>

        <link rel="icon" href="/favicon.ico" />

        <script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossOrigin="anonymous"></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossOrigin="anonymous"></script>

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossOrigin="anonymous"
        ></script>
      </Head>

      <Header />

      <main role="main">
        { children }
      </main>

      <Footer />

      <style jsx>{ `
        @font-face {
          font-family: 'Circe';
          src: url('/fonts/Circe-Light.eot');
          src: url('/fonts/Circe-Light.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Circe-Light.woff2') format('woff2'),
              url('/fonts/Circe-Light.woff') format('woff'),
              url('/fonts/Circe-Light.ttf') format('truetype');
          font-weight: 300;
          font-style: normal;
        }

        @font-face {
          font-family: 'Circe Extra';
          src: url('/fonts/Circe-ExtraBold.eot');
          src: url('/fonts/Circe-ExtraBold.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Circe-ExtraBold.woff2') format('woff2'),
              url('/fonts/Circe-ExtraBold.woff') format('woff'),
              url('/fonts/Circe-ExtraBold.ttf') format('truetype');
          font-weight: 800;
          font-style: normal;
        }

        @font-face {
          font-family: 'Circe';
          src: url('/fonts/Circe-Thin.eot');
          src: url('/fonts/Circe-Thin.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Circe-Thin.woff2') format('woff2'),
              url('/fonts/Circe-Thin.woff') format('woff'),
              url('/fonts/Circe-Thin.ttf') format('truetype');
          font-weight: 100;
          font-style: normal;
        }

        @font-face {
          font-family: 'Circe';
          src: url('/fonts/Circe-Regular.eot');
          src: url('/fonts/Circe-Regular.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Circe-Regular.woff2') format('woff2'),
              url('/fonts/Circe-Regular.woff') format('woff'),
              url('/fonts/Circe-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'Circe';
          src: url('/fonts/Circe-Bold.eot');
          src: url('/fonts/Circe-Bold.eot?#iefix') format('embedded-opentype'),
              url('/fonts/Circe-Bold.woff2') format('woff2'),
              url('/fonts/Circe-Bold.woff') format('woff'),
              url('/fonts/Circe-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
      ` }</style>
    </>
  )
}

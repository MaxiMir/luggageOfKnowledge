import React from 'react'
import Head from 'next/head'
// import { FixedMenu } from '../components/Navigation/FixedMenu'

export const MainLayout = ({ children, title }) => {

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>

      <header>
        {/*<FixedMenu/>*/ }

        <nav>
          NAVIGATION
        </nav>
      </header>

      <main>
        { children }
      </main>

      <footer>FOOTER</footer>

      <style jsx>{ `
        @font-face {
          font-family: 'Circle';
            font-style: normal;
            src: url('/fonts/Circle-Regular.ttf');
            src: url('/fonts/Circle-Bold.ttf');
            src: url('/fonts/Circle-Black.ttf');
            src: url('/fonts/Circle-ExtraLight.ttf');
        }
      `}</style>
    </>
  )
}

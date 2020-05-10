import React from 'react'
import { createGlobalStyle } from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css'

const GlobalStyle = createGlobalStyle`
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

  body {
    font-family: Circe, serif;
    font-size: 14px;
  }
`;

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle/>
      <Component { ...pageProps } />
    </>
  );
};

export default MyApp;

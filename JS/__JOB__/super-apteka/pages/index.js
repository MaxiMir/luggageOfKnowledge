import React from 'react'
import fetch from 'isomorphic-unfetch'

import { MainLayout } from '../layout/MainLayout'
import { AppSlider } from '../components/UI/AppSlider'


const indexPage = ({ albums }) => (
  <MainLayout title="Главная">
    <AppSlider />
  </MainLayout>
)

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  const albumsColl = await res.json()
  const albums = [albumsColl[0]]

  return {
    props: {
      albums,
    },
  }
}

export default indexPage

import React from 'react'
import fetch from 'isomorphic-unfetch'
import { MainLayout } from '../layout/MainLayout'


const indexPage = ({ post }) => (
  <MainLayout title={ post.title }>

  </MainLayout>
)

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  const post = await res.json()

  return {
    props: {
      post,
    },
  }
}

export default indexPage

import React from 'react'
import fetch from 'isomorphic-unfetch'
import { MainLayout } from '../layout/MainLayout'


const indexPage = ({ albums }) => (
  <MainLayout title="Главная">
    <div className="container">
      <div className="row">
        <div className="d-flex flex-wrap justify-content-between mt-4">
          { albums.map(album => (
            <div className="card text-white bg-primary mb-3" style={ { width: '18rem' } } key={album.id}>
              <img className="card-img-top" src={ album.url } alt="Card image cap"/>
              <div className="card-body">
                <p className="card-text">{ album.title }</p>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  </MainLayout>
)

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
  const albums = await res.json()

  return {
    props: {
      albums,
    },
  }
}

export default indexPage

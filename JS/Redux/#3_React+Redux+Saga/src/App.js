import React from 'react'

import PostForm from './components/PostForm'
import Posts from './components/Posts';
import FetchedPosts from './components/FetchedPosts';

function App() {
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">
          <PostForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Синхронные Посты</h2>
          <Posts post={[1,2,3]} />
        </div>
        <div className="col">
          <h2>Асинхронные Посты</h2>
          <FetchedPosts post={[]} />
        </div>
      </div>
    </div>
  )
}

export default App

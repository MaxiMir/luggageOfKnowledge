import React from 'react'
import Link from 'next/link';
import Router from 'next/router';


const errorPage = () => (
  <div>
    <h1>404</h1>
    <Link href="/">НА ГЛАВНУЮ</Link>
    <button onClick={() => Router.push('/')}>НА ГЛАВНУЮ</button>
  </div>
)

export default errorPage

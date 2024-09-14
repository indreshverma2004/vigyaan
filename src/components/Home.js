import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/info">info</Link>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/signup">signup</Link>
      </div>
  </nav>
  <h1>You have not logged in</h1>
  </>
  )
}

export default Home


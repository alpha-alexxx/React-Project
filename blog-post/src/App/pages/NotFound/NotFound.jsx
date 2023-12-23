import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <h1 className='not-found-heading'>404 | Not Found</h1>
      <p className="zoom-area"><b>CSS</b> animations to make a cool 404 page. </p>
      <section className="error-container">
        <span className="four"><span className="screen-reader-text">4</span></span>
        <span className="zero"><span className="screen-reader-text">0</span></span>
        <span className="four"><span className="screen-reader-text">4</span></span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">Go to Homepage</Link>
      </div>
    </>
  )
}

export default NotFound
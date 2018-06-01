import React from 'react';
import Link from 'gatsby-link';

const NotFoundPage = () => (
  <section className="container">        
    <h1>Oh no!</h1>
    <h3>We can't seem to find the page you're looking for.</h3>
    <h3><Link to='/'>Back to the homepage</Link></h3>
  </section>
)

export default NotFoundPage

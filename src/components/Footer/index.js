import React from 'react';

// Resources
import footerLogo from './images/logo-prismic.svg';

const Footer = () => (
  <footer>
    <p>Proudly published with <a href="https://prismic.io" target="_blank" rel="noopener">Prismic</a>
      <br/>
      <a href="https://prismic.io" target="_blank" rel="noopener">
        <img src={footerLogo} className="footer-logo"/>
      </a>
    </p>
  </footer>
)

export default Footer

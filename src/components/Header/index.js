import React from 'react';
import Prismic from 'prismic-javascript';
import Cookies from 'js-cookie';
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs';
import PrismicConfig from '../../../prismic-config';

// Components
import Link from 'gatsby-link';

class Header extends React.Component {
  state = {
    menu: this.props.menu,
    apiEndpoint: this.props.apiEndpoint,
  }

  componentWillMount() {
    
    // Check for a preview cookie
    const previewCookie = Cookies.get(Prismic.previewCookie);

    // Retrieve preview content if cookie is set
    if (previewCookie !== undefined) {
      Prismic.api(PrismicConfig.apiEndpoint).then(api => {
        api.getSingle('menu').then(document => {
          if (document) {
            this.setState({ menu: document });
          }
        });
      });
    }
  }
  
  render() {
    // Set the menu object
    const menu = this.state.menu;
    
    // Get the navigation links
    const navLinks = menu.data.menu_links.map(function(item, index){
      return <li key={index}><Link to={PrismicLink.url(item.link, PrismicConfig.linkResolver)}>{RichText.asText(item.label)}</Link></li>;
    });
    
    return (
      <header className="site-header">
        <Link to="/">
          <div className="logo">Example Site</div>
        </Link>
        <nav>
          <ul>
            {navLinks}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header

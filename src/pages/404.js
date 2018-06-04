import React from 'react';
import Cookies from 'js-cookie';
import Prismic from 'prismic-javascript';
import PrismicConfig from '../../prismic-config';

// Components
import Link from 'gatsby-link';
import MainContent from '../components/MainContent';

class NotFoundPage extends React.Component {
  state = {
    doc: null,
    apiEndpoint: this.props.data.site.siteMetadata.prismicEndpoint,
    isPreview: false
  }

  componentWillMount() {
    
    // Check for a preview cookie
    const previewCookie = Cookies.get(Prismic.previewCookie);
    
    // Retrieve preview content if cookie is set
    if (previewCookie !== undefined) {
      
      const uid = window.location.pathname.replace(/^\/|\/$/g, '');
      
      console.log(uid);

      Prismic.api(PrismicConfig.apiEndpoint).then(api => {
        api.getByUID('page', uid).then(document => {
          if (document) {
            this.setState({
              doc: document,
              isPreview: true
            });
          }
        });
      });
    }
  }
 
  componentDidMount() {
    this.refreshToolbar();
  }
 
  componentDidUpdate() {
    this.refreshToolbar();
  }
 
  // Launch the prismic.io toolbar
  refreshToolbar() {
    if (window.PrismicToolbar) {
      window.PrismicToolbar.setup(this.state.prismicEndpoint);
      window.PrismicToolbar.setupEditButton();
    }
  }
  
  render() {
    // Set the document object
    const document = this.state.doc;

    if (this.state.isPreview) {
      return (
        <div data-wio-id={document.id}>
          <MainContent sliceZone={document.data.page_content}/>
        </div>
      );
    } else {
      return (
        <section className="container">        
          <h1>Oh no!</h1>
          <h3>We can't seem to find the page you're looking for.</h3>
          <h3><Link to='/'>Back to the homepage</Link></h3>
        </section>
      );
    }
  }
}
export const query = graphql`
query NotFoundQuery {
  site {
    siteMetadata {
      title
      prismicEndpoint
    }
  }
}
`

export default NotFoundPage


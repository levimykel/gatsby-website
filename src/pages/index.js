import React from 'react';
import Prismic from 'prismic-javascript';
import Cookies from 'js-cookie';
import {Link as PrismicLink, RichText, Date} from 'prismic-reactjs';
import PrismicConfig from '../../prismic-config';

// Components
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import MainContent from '../components/MainContent';

class IndexPage extends React.Component {
  state = {
    doc: this.props.data.allPrismicDocument.edges[0].node,
    apiEndpoint: this.props.data.site.siteMetadata.prismicEndpoint,
  }

  componentWillMount() {
    
    // Check for a preview cookie
    const previewCookie = Cookies.get(Prismic.previewCookie);
    
    // Retrieve preview content if cookie is set
    if (previewCookie !== undefined) {
      Prismic.api(PrismicConfig.apiEndpoint).then(api => {
        api.getSingle('homepage').then(document => {
          if (document) {
            this.setState({ doc: document });
          }
        });
      });
    }
  }
 
  componentDidUpdate() {
    // Launch the prismic.io toolbar
    const apiEndpoint = this.state.prismicEndpoint;
    window.PrismicToolbar.setup(apiEndpoint);
  }
  
  render() {
    // Set the document object
    const document = this.state.doc;
    
    // Get the banner content
    const banner = document.data.homepage_banner[0];
    const buttonLink = PrismicLink.url(banner.button_link, PrismicConfig.linkResolver);
    const buttonLabel = RichText.asText(banner.button_label);
    const button = buttonLink && buttonLabel != " " ? <Link className="banner-button" to={buttonLink}>{buttonLabel}</Link> : null;
    
    return (
      <div data-wio-id={document.id}>
        <Helmet bodyAttributes={{ class: 'homepage' }} />
        <section className="homepage-banner" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(' + banner.image.url + ')' }}>
          <div className="banner-content container">
            <h2 className="banner-title">{RichText.asText(banner.title)}</h2>
            <p className="banner-description">{RichText.asText(banner.tagline)}</p>
            {button}
          </div>
        </section>
        <MainContent sliceZone={document.data.page_content}/>
      </div>
    );
  }
}

export const query = graphql`
  query IndexPageQuery {
    allPrismicDocument(filter: { type: { eq: "homepage" } }) {
      edges {
        node {
          id
          uid
          type
          data {
            homepage_banner {
              title {
                type
                text
              }
              tagline {
                type
                text
              }
              button_link {
                id
                type
                lang
                uid
                link_type
                isBroken
              }
              image {
                url
              }
              button_label {
                type
                text
              }
            }
            page_content {
              slice_type
              slice_label
              primary {
                rich_text {
                  type
                  text
                  spans {
                    start
                    end
                    type
                  }
                }
                image {
                  url
                  alt
                }
                featured_image {
                  url
                  alt 
                }
                title {
                  type
                  text
                }
                headline {
                  type
                  text
                }
                link {
                  id
                  type
                  lang
                  uid
                  link_type
                  isBroken
                }
                link_label {
                  type
                  text
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        prismicEndpoint
      }
    }
  }
`

export default IndexPage

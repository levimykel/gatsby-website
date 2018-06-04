import React from 'react';
import Prismic from 'prismic-javascript';
import Cookies from 'js-cookie';
import {Link as PrismicLink, RichText} from 'prismic-reactjs';
import PrismicConfig from '../../prismic-config';

// Components
import Link from 'gatsby-link';
import MainContent from '../components/MainContent';

class Page extends React.Component {
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
        api.getByUID('page', this.state.doc.uid).then(document => {
          if (document) {
            this.setState({ doc: document });
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
    
    return (
      <div data-wio-id={document.id}>
        <MainContent sliceZone={document.data.page_content}/>
      </div>
    );
  }
}

export const query = graphql`
  query PageQuery($slug: String!) {
    allPrismicDocument(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          id
          uid
          type
          data {
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
                quote_text {
                  type
                  text
                }
                gallery_title {
                  type
                  text
                  spans {
                    start
                    end
                    type
                  }
                }
              }
              items {
                image_description {
                  type
                  text
                  spans {
                    start
                    end
                    type
                  }
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
                image {
                  url
                  alt
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
`;

export default Page

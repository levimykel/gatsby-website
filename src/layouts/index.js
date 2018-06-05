import React from 'react';
import PropTypes from 'prop-types';

// Components
import Helmet from 'react-helmet';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Resources
import './stylesheets/reset.css';
import './stylesheets/common.css';
import './stylesheets/style.css';
import favicon from './images/punch.png';

const TemplateWrapper = ({ data, children }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Example Gatsby Website with Prismic' }
      ]}
    >
      <link rel="icon" type="image/png" href={favicon}/>
      <link href="https://fonts.googleapis.com/css?family=Lato:400,700,900,400italic,700italic" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css?family=Lora:400,400italic,700,700italic" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <script>{`
        window.prismic = {
          endpoint: "${data.site.siteMetadata.prismicEndpoint}"
        };`}
      </script>
      <script type="text/javascript" src="//static.cdn.prismic.io/prismic.min.js"></script>
    </Helmet>
    <Header menu={data.allPrismicDocument.edges[0].node} apiEndpoint={data.site.siteMetadata.prismicEndpoint}/>
    {children()}
    <Footer />
  </div>
)

export const query = graphql`
  query TemplateWrapperQuery {
    allPrismicDocument(filter: { type: { eq: "menu" } }) {
      edges {
        node {
          id
          uid
          type
          data {
            menu_links {
              label {
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

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

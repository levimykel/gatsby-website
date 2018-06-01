
"use strict";
const PrismicConfig = require('./prismic-config');

module.exports = {
  siteMetadata: {
    title: 'Sample Gatsby Site',
    prismicEndpoint: `${PrismicConfig.apiEndpoint}`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: `${PrismicConfig.prismicRepoName}`,
        accessToken: ``,
      },
    },
    'gatsby-plugin-react-helmet'
  ],
};

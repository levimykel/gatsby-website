
const prismicRepoName = 'sample-site';

module.exports = {

  prismicRepoName: prismicRepoName,
  
  apiEndpoint: `https://${prismicRepoName}.prismic.io/api/v2`,

  // -- Link Resolver
  // This function will be used to generate links to Prismic documents
  linkResolver(doc) {
    if (doc.type === 'page') return '/' + doc.uid;
    return '/';
  }
};

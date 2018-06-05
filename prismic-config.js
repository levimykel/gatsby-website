
const prismicRepoName = 'sample-site';

module.exports = {

  prismicRepoName: prismicRepoName,
  
  apiEndpoint: `https://${prismicRepoName}.prismic.io/api/v2`,

  // -- Link Resolver
  // This function will be used to generate links to Prismic documents
  linkResolver(doc) {
    if (doc.type === 'page') return '/' + doc.uid;
    return '/';
  },

  // -- Toolbar Refresh
  // This function will be used to refresh the Prismic Toolbar 
  refreshToolbar() {
    this.waitForGlobal('PrismicToolbar').then(() => {
      if (window.PrismicToolbar) {
        window.PrismicToolbar.setup(exports.apiEndpoint);
        window.PrismicToolbar.setupEditButton();
      }
    });
  },

  // -- Wait for Global
  // This function will be used to wait for javascript libraries to load in the window
  waitForGlobal(name, timeout = 300) {
    return new Promise((resolve, reject) => {
      let waited = 0
  
      function wait(interval) {
        setTimeout(() => {
          waited += interval
          
          // Check if script is loaded
          if (window[name] !== undefined) {
            return resolve()
          }
          if (waited >= timeout * 1000) {
            return reject({ message: 'Timeout' })
          }
          wait(interval * 2)
        }, interval)
      }
  
      wait(30)
    })
  },
};

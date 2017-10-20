const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  /**
   * Create pages from Markdown files in src/pages
   */
  const pages = new Promise((resolve, reject) => {
    graphql(`
      {
        pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/pages/"}}) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.pages.edges.map(({node}) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/page.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug
          }
        });
      });
      resolve();
    });
  });

  /**
   * Create pages from SEEDS packages
   */
  const packages = new Promise((resolve, reject) => {
    graphql(`
      {
        packages: allSeedsPackage {
          edges {
            node {
              packageName
              version
            }
          }
        }
      }
    `).then(result => {
      result.data.packages.edges.map(({node}) => {
        const slug = node.packageName.replace('seeds-', '');
        const pageProps = {
          path: `/packets/${slug}/`,
          component: path.resolve('./src/templates/package.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            packageName: node.packageName,
            slug: `/${slug}/`
          }
        };
        // First create the "latest" version at the slug path
        createPage(pageProps);

        // Then create the a versioned path
        createPage(Object.assign({}, pageProps, {
          path: `/packets/${slug}/${node.version}/`
        }));
      });
      resolve();
    });
  });

  return Promise.all([pages, packages]);
};

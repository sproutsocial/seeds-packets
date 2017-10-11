const {createFilePath} = require('gatsby-source-filesystem');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

exports.onCreateNode = async function onCreateNode({node, getNode, boundActionCreators, loadNodeContent}) {
  const {createNodeField, createNode, createParentChildLink} = boundActionCreators;
  /**
   * Associate Markdown files with package names
   */
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({node, getNode, basePath: 'pages'});
    const packageName = node.fileAbsolutePath.match(/@sproutsocial\/([a-z-]*)\//);
    const baseName = path.parse(node.fileAbsolutePath).name;

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });

    createNodeField({
      node,
      name: 'packageName',
      value: packageName && packageName[1]
    });

    createNodeField({
      node,
      name: 'baseName',
      value: baseName
    });
  }

  /**
   * Create nodes for SEEDS packages from package.json files
   */
  if (node.internal.mediaType === 'application/json' && node.base == 'package.json') {
    const content = await loadNodeContent(node);
    const package = JSON.parse(content);

    const contentDigest = crypto
      .createHash('md5')
      .update(JSON.stringify(content))
      .digest('hex');

    const packageNode = {
      id: `${node.id} >>> SeedsPackage`,
      children: [],
      parent: node.id,
      internal: {
        content,
        contentDigest,
        type: 'SeedsPackage'
      },
      packageName: package.name.replace('@sproutsocial/', ''),
      ...package
    };
    createNode(packageNode);
    createParentChildLink({parent: node, child: packageNode});
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;
  /**
   * Create pages from Markdown files in src/pages
   */
  const pages = new Promise((resolve, reject) => {
    graphql(`
      {
        pages: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src\/pages/"}}) {
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
   * Create pages from Markdown files in src/pages
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
        createPage({
          path: `/${node.packageName}/`,
          component: path.resolve('./src/templates/package.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            packageName: node.packageName,
            slug: `/${node.packageName}/`
          }
        });

        createPage({
          path: `/${node.packageName}/${node.version}/`,
          component: path.resolve('./src/templates/package.js'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            packageName: node.packageName,
            slug: `/${node.packageName}/`
          }
        });
      });
      resolve();
    });
  });

  return Promise.all([pages, packages]);
};

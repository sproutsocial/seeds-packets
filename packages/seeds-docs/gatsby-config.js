module.exports = {
  siteMetadata: {
    title: 'SEEDS'
  },
  pathPrefix: '/seeds',  
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/node_modules/@sproutsocial`
      }
    },
    'gatsby-plugin-sass',
    `gatsby-plugin-catch-links`,
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',  
    'gatsby-transformer-remark',
    'transformer-seeds-package',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline'
  ]
};

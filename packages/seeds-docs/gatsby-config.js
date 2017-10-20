module.exports = {
  siteMetadata: {
    title: 'SEEDS'
  },
  pathPrefix: '/seeds',  
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/pages/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'packages',
        path: `${__dirname}/node_modules/@sproutsocial`
      }
    },
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',  
    'gatsby-transformer-remark',
    'transformer-seeds-package',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline'
  ]
};

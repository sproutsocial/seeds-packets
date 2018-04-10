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
        name: 'packets',
        path: `${__dirname}/node_modules/@sproutsocial`
      }
    },
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    'gatsby-transformer-remark',
    'transformer-seeds-packet',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline'
  ]
};

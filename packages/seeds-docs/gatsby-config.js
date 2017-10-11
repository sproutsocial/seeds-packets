module.exports = {
  siteMetadata: {
    title: 'SEEDS',
    navigation: [
      {
        title: 'Border',
        url: '/border/'
      }
    ]
  },
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
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-manifest',
    'gatsby-plugin-offline'
  ]
};

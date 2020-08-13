module.exports = {
  siteMetadata: {
    title: 'Outpost',
    description: 'Communities controlled by users, not big tech',
    author: 'https://outpost-protocol.com/'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'outpost-app',
        short_name: 'outpost-app',
        start_url: '/',
        background_color: '#fafafa',
        theme_color: '#1a1a1a',
        display: 'minimal-ui',
        icon: './src/images/logo/Outpost_black.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: ['400', '700']
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://infinite-scrubland-23817.herokuapp.com/'
      }
    },
    {
      resolve: 'gatsby-plugin-react-redux',
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: './src/redux/store'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}

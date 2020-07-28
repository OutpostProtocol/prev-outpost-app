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
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'fonts',
        path: `${__dirname}/src/fonts`
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
      resolve: 'gatsby-source-graphql',
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: 'OutpostApi',
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: 'outpostapi',
        // Url to query from
        url: 'http://localhost:4000/'
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}

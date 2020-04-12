module.exports = {
  siteMetadata: {
    title: `Micro Rain`,
    description: `A micro blog for self-governed online communities`,
    author: `https://clearrain.xyz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `micro-rain`,
        short_name: `micro-rain`,
        start_url: `/`,
        background_color: `#333333`,
        theme_color: `#333333`,
        display: `minimal-ui`,
        icon: `./src/images/drop64x64.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

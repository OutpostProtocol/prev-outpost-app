import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import Main from '../components/Main'
import Toolbar from '../components/Toolbar'

const IndexPage = ({ data }) => {
  return (
    <div>
      <SEO title="Home" />
      <Toolbar />
      <CommunityDrawer
        img={data.logo.childImageSharp}
      />
      <Main />
    </ div>
  )
}

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "logo/Outpost_black.png" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default IndexPage

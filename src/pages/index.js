import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import RightSidebar from '../components/RightSidebar'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <CommunityDrawer img={data.logo.childImageSharp}/>
    <RightSidebar />
  </Layout>
)

export const query = graphql`
  query {
    logo: file(relativePath: { eq: "drops/drop_dk_grey.png" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default IndexPage

import React from 'react'
import { graphql } from 'gatsby'
import { styled } from '@material-ui/core/styles'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import Main from '../components/Main'

const PageContainer = styled('div')({
  display: 'flex'
})

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <PageContainer>
        <CommunityDrawer
          img={data.logo.childImageSharp}
        />
        <Main />
      </PageContainer>
    </Layout>
  )
}

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

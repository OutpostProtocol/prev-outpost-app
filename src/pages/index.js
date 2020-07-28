import React from 'react'
import { useSelector } from 'react-redux'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import Main from '../components/Main'
import Toolbar from '../components/Toolbar'

const IndexPage = ({ data }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  return (
    <div>
      <SEO title="Home" />
      { isLoggedIn &&
        <Toolbar />
      }
      <CommunityDrawer
        img={data.logo.childImageSharp}
      />
      <Main posts={data.posts.Posts}/>
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
    posts: outpostapi {
      Posts {
        txId
        title
        body
        subtitle
        timestamp
        community {
          name
        }
        user {
          did
        }
      }
    }
  }
`

export default IndexPage

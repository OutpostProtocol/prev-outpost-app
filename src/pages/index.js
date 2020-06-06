import React from 'react'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import Main from '../components/Main'

import styles from './index.module.css'

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />
      <div className={styles.flexGrid}>
        <CommunityDrawer
          img={data.logo.childImageSharp}
        />
        <Main
        />
      </div>
    </>
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

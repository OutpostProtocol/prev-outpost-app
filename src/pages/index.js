import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import RightSidebar from '../components/RightSidebar'
import Main from '../components/Main'

import styles from './index.module.css'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.flexGrid}>
        <CommunityDrawer
          img={data.logo.childImageSharp}
        />
        <Main
        />
        <RightSidebar/>
      </div>
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

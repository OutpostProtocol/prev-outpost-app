import React from 'react'
import { graphql } from 'gatsby'
import { useSelector } from 'react-redux'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import RightSidebar from '../components/RightSidebar'
import Main from '../components/Main'

import styles from './index.module.css'

const IndexPage = ({ data }) => {
  const web3 = useSelector(state => state.ethers)
  const space = useSelector(state => state.space)

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.flexGrid}>
        <CommunityDrawer
          img={data.logo.childImageSharp}
        />
        <Main
          address={web3.provider && web3.provider.selectedAddress}
          space={space}
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

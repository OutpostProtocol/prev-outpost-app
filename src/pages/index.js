import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Box from '3box'
import { useSelector } from 'react-redux'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import CommunityDrawer from '../components/CommunityDrawer'
import RightSidebar from '../components/RightSidebar'
import Main from '../components/Main'

import styles from './index.module.css'

const SIDE_BAR_WIDTH = 22

const IndexPage = ({ data }) => {
  const [space, setSpace] = useState(null)
  const web3 = useSelector(state => state.ethers)

  const getBox = async () => {
    const address = web3.library.provider.selectedAddress

    const box = await Box.create(web3.library.provider)

    const spaces = ['communities']
    await box.auth(spaces, { address })
    const comSpace = await box.openSpace('communities')
    setSpace(comSpace)
  }

  if (web3.library && web3.library.provider.selectedAddress) {
    getBox()
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div className={styles.container}>
        <CommunityDrawer
          img={data.logo.childImageSharp}
          styles={{
            width: `${SIDE_BAR_WIDTH}vw`
          }}
        />
        <Main
          address={web3.library && web3.library.provider.selectedAddress}
          space={space}
          styles={{
            width: `${100 - (2 * SIDE_BAR_WIDTH)}vw`
          }}
        />
        <RightSidebar
          styles={{
            width: `${SIDE_BAR_WIDTH}vw`
          }}
        />
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

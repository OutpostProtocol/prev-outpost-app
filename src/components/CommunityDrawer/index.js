import React from 'react'
import { Link } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import { Drawer } from '@material-ui/core'
import Loadable from '@loadable/component'

import CreateCommunity from '../CreateCommunity'
import CommunityView from '../CommunityView'
import Footer from './Footer'

const LoadableWeb3Status = Loadable(() => import('../Web3Status'))

const GridContainer = styled('div')({
  height: '100vh',
  position: 'fixed'
})

const DrawerContentsContainer = styled('div')({
  width: '20vw'
})

const LogoContainer = styled('div')({
  position: 'relative',
  margin: '10px 0',
  'text-align': 'center'
})

const Logo = styled(Link)({
  width: '20%'
})

const CommunityDrawer = ({ img }) => {
  const DrawerContents = () => {
    return (
      <DrawerContentsContainer>
        <LogoContainer>
          <Logo
            to='/'
          >
            <Img
              fixed={img.fixed}
            />
          </Logo>
        </LogoContainer>
        <LoadableWeb3Status />
        <CreateCommunity />
        <CommunityView />
        <Footer />
      </DrawerContentsContainer>
    )
  }

  return (
    <GridContainer>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: '#f7f6f3'
          }
        }}
        anchor='left'
        variant='persistent'
        open={true}
        elevation={4}
      >
        <DrawerContents />
      </Drawer>
    </GridContainer>
  )
}

CommunityDrawer.propTypes = {
  img: PropTypes.object
}

export default CommunityDrawer

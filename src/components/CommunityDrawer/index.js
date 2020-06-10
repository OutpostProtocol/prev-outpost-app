import React, { useState } from 'react'
import { Link } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import {
  Drawer,
  IconButton
} from '@material-ui/core'
import {
  ChevronLeft,
  ChevronRight
} from '@material-ui/icons'

import CreateCommunity from '../CreateCommunity'
import CommunityView from '../CommunityView'
import Web3Status from '../Web3Status'
import Footer from './Footer'

const GridContainer = styled('div')({
  height: '100vh',
  position: 'fixed',
  'z-index': 1
})

const CloseChevron = styled(IconButton)({
  float: 'right',
  color: 'inherit',
  'aria-label': 'Close Sidebar',
  'margin-right': 'auto'
})

const OpenChevron = styled(IconButton)({
  color: 'inherit',
  'aria-label': 'View Commnities',
  'margin-top': '10px'
})

const DrawerContentsContainer = styled('div')({
  width: '20vw'
})

const LogoContainer = styled('div')({
  margin: '10px 0'
})

const Logo = styled(Link)({
  width: '20%',
  'margin-left': '40%'
})

const CommunityDrawer = ({ img }) => {
  const [open, setOpen] = useState(true)

  const DrawerContents = ({ img }) => {
    return (
      <DrawerContentsContainer>
        <LogoContainer>
          <Logo to='/'>
            <Img fixed={img.fixed} />
          </Logo>
          <CloseChevron
            edge='end'
            onClick={() => setOpen(false)}
          >
            <ChevronLeft />
          </CloseChevron>
        </LogoContainer>
        <Web3Status />
        <CreateCommunity />
        {/* search for new communities */}
        <CommunityView />
        <Footer />
      </DrawerContentsContainer>
    )
  }

  return (
    <GridContainer>
      <OpenChevron
        edge= 'start'
        onClick={() => setOpen(true)}
      >
        <ChevronRight />
      </OpenChevron>
      <Drawer
        anchor='left'
        variant='persistent'
        open={open}
        elevation={4}
      >
        <DrawerContents img={img} />
      </Drawer>
    </GridContainer>
  )
}

CommunityDrawer.propTypes = {
  img: PropTypes.object
}

export default CommunityDrawer

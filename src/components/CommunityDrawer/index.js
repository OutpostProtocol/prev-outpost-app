import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { styled } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import CreateCommunity from '../CreateCommunity'
import CommunityView from '../CommunityView'
import Web3Status from '../Web3Status'

const CommunityDrawer = ({ img }) => {
  const [open, setOpen] = useState(true)

  const Sidebar = styled('div')({
    width: '18vw'
  })

  const LogoContainer = styled('div')({
    'margin-top': '10px'
  })

  const Logo = styled(Link)({
    width: '20%',
    to: '/',
    'margin-left': '40%'
  })

  const CloseChevron = styled(IconButton)({
    float: 'right',
    color: 'inherit',
    edge: 'end',
    'aria-label': 'Close Sidebar',
    'margin-right': 'auto'
  })

  const OpenChevron = styled(IconButton)({
    color: 'inherit',
    edge: 'start',
    'aria-label': 'View Commnities',
    'margin-top': '10px'
  })

  const DrawerContents = ({ img }) => {
    return (
      <Sidebar>
        <LogoContainer>
          <Logo>
            <Img fixed={img.fixed} />
          </Logo>
          <CloseChevron
            onClick={() => setOpen(false)}
          >
            <ChevronLeftIcon />
          </CloseChevron>
        </LogoContainer>
        <Web3Status />
        <CreateCommunity />
        {/* search for new communities */}
        <CommunityView />
      </Sidebar>
    )
  }

  return (
    <div>
      <OpenChevron
        onClick={() => setOpen(true)}
      >
        <ChevronRightIcon />
      </OpenChevron>
      <Drawer
        anchor="left"
        variant="persistent"
        open={open}
        elevation={4}
      >
        <DrawerContents img={img} />
      </Drawer>
    </div>
  )
}

CommunityDrawer.propTypes = {
  img: PropTypes.object
}

export default CommunityDrawer

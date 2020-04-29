import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CommunityTile from '../CommunityTile'

import styles from './index.module.css'

const CommunityDrawer = ({ title, img }) => {
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const DrawerContents = ({ img }) => {
    let communities
    if (window.spaces === undefined) {
      communities = ['Log in', 'to see', 'communities']
    } else {
      communities = window.spaces
    }

    return (
      <div>
        <div className={styles.logoContainer}>
          <Link to='/' className={styles.logo}>
            <Img fixed={img.fixed} />
          </Link>
          <IconButton
            color="inherit"
            aria-label="Close Sidebar"
            edge="end"
            onClick={handleDrawerClose}
            className={styles.closeChevron}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {/* search for new communities */}
        {communities.map((communityName, i) => {
          return (
            <CommunityTile
              name ={communityName}
              key={i}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.container} >
      <IconButton
        color="inherit"
        aria-label="View Communities"
        edge="start"
        onClick={handleDrawerOpen}
        className={styles.openChevron}
      >
        <ChevronRightIcon />
      </IconButton>
      <Drawer
        anchor="left"
        variant="persistent"
        open={open}
        elevation={4}
        classes={{
          paper: styles.drawerPaper
        }}
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

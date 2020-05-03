import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import CreateCommunity from '../CreateCommunity'
import CommunityTile from '../CommunityTile'
import styles from './index.module.css'

const CommunityDrawer = ({ title, img }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const communities = useSelector(state => state.communities)
  const theme = useTheme()
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const DrawerContents = ({ img }) => {
    return (
      <div
        style={{
          width: `${theme.sidebarWidth}vw`
        }}
      >
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
        {isLoggedIn
          ? <CreateCommunity />
          : null
        }
        {/* search for new communities */}
        {communities.map((com, i) => {
          return (
            <CommunityTile
              name={com.name}
              abbr={com.abbr}
              key={i}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={styles.container}
      style={{
        width: `${theme.sidebarWidth}vw`
      }}
    >
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

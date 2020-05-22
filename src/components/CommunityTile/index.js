import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { REMOVE_COMMUNITY_ASYNC } from '../../redux/actionTypes'
import styles from './index.module.css'

const CommunityTile = ({ community }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch('')

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeCommunity = () => {
    dispatch({ type: REMOVE_COMMUNITY_ASYNC, community })
  }

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div
      className={styles.tileContainer}
    >
      <div className={styles.tileStatus}>
        <div>
          {capitalize(community.name)} ({community.abbr.toUpperCase()})
        </div>
      </div>
      {isLoggedIn
        ? <div>
          <IconButton
            onClick={handleOpen}
            aria-label="options"
            aria-haspopup="true"
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <MenuItem onClick={removeCommunity}>Remove</MenuItem>
          </Menu>
        </div>
        : null
      }

    </div>
  )
}

export default CommunityTile

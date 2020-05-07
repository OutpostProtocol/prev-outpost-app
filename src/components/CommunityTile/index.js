import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import styles from './index.module.css'

const CommunityTile = ({ community, callback, remove }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <div
      className={styles.tileContainer}
    >
      <div className={styles.tileStatus}>
        <Checkbox
          checked={community.visible}
          onChange={callback}
          value={community.address}
          inputProps={{ 'aria-label': 'Display community in feed?' }}
        />
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
            <MenuItem onClick={() => remove(community.abbr)}>Remove</MenuItem>
          </Menu>
        </div>
        : null
      }

    </div>
  )
}

export default CommunityTile

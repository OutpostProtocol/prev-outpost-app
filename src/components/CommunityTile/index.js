import React, { useState } from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

import { REMOVE_COMMUNITY_ASYNC } from '../../redux/actionTypes'

const TileContainer = styled('div')({
  width: '80%',
  padding: '0 5%',
  margin: '0.5em auto',
  display: 'flex',
  height: '2em',
  'justify-content': 'space-between',
  'align-items': 'center'
})

const TileStatus = styled('div')({
  display: 'flex',
  'align-items': 'center'
})

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

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <TileContainer>
      <TileStatus>
        <div>
          {capitalize(community.name)} ({community.symbol.toUpperCase()})
        </div>
      </TileStatus>
      {isLoggedIn &&
        <div>
          <IconButton
            onClick={handleOpen}
            aria-label='options'
            aria-haspopup='true'
          >
            <MoreHoriz />
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
      }
    </TileContainer>
  )
}

export default CommunityTile

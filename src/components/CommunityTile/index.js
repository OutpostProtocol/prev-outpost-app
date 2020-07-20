import React, { useState } from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { navigate } from 'gatsby'
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
  margin: '5px 10%',
  display: 'flex',
  height: '2em',
  'border-radius': '4px',
  'justify-content': 'space-between',
  'align-items': 'center',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafa'
  }
})

const TileStatus = styled('div')({
  display: 'flex',
  'align-items': 'center'
})

const CommunityTile = ({ community }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [anchorEl, setAnchorEl] = useState(null)
  const dispatch = useDispatch('')
  const url = '/community' + community.address

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleRedirect = () => {
    navigate(url, { state: { community } })
  }

  const removeCommunity = () => {
    dispatch({ type: REMOVE_COMMUNITY_ASYNC, community })
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <TileContainer
      onClick={() => handleRedirect()}
    >
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

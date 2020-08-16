import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'

import { PLACEHOLDER_COMMUNITY } from '../../constants'
import { capitalize } from '../../utils'

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
    'background-color': '#f4f4f4'
  }
})

const TileStatus = styled('div')({
  display: 'flex',
  'align-items': 'center',
  'font-size': '0.9em',
  'padding-left': '2%'
})

const CommunityTile = ({ community }) => {
  if (!community) community = PLACEHOLDER_COMMUNITY
  const url = '/community/' + community.txId

  const handleRedirect = () => {
    navigate(url, { state: { community } })
  }

  if (community.name) {
    return (
      <TileContainer
        onClick={() => handleRedirect()}
      >
        <TileStatus>
          <div>
            {capitalize(community.name)}
          </div>
        </TileStatus>
      </TileContainer>
    )
  } else {
    return null
  }
}

export default CommunityTile

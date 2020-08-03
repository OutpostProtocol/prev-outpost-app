import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'

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
  'align-items': 'center',
  'font-size': '0.9em',
  'padding-left': '2%'
})

const CommunityTile = ({ community }) => {
  const url = '/community/' + community.txId

  const handleRedirect = () => {
    navigate(url, { state: { community } })
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
          {capitalize(community.name)}
        </div>
      </TileStatus>
    </TileContainer>
  )
}

export default CommunityTile

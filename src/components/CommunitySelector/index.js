import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Select,
  MenuItem
} from '@material-ui/core'

const CommunitySelect = styled(Select)({
  margin: '5px',
  float: 'left',
  'min-width': '150px'
})

const CommunitySelector = ({ handleSelection, placeHolder }) => {
  const communities = useSelector(state => state.communities.length !== 0 ? state.communities : null)
  const [activeCommunity, setActiveCommunity] = useState(placeHolder)

  const switchActiveCommunity = (event) => {
    if (event && event.target.value) {
      setActiveCommunity(event.target.value)
    }
    handleSelection(event)
  }

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <CommunitySelect
      labelId='input-label'
      value={activeCommunity}
      onChange={switchActiveCommunity}
    >
      <MenuItem value={placeHolder} >
        <em>{capitalize(placeHolder.name)}</em>
      </MenuItem>
      {communities && communities.map((com, i) => {
        return (
          <MenuItem
            key={i}
            value={com}>
            {capitalize(com.name)}
          </MenuItem>
        )
      })}
    </CommunitySelect>
  )
}

export default CommunitySelector

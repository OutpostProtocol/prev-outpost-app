import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Select,
  MenuItem
} from '@material-ui/core'

import { capitalize } from '../../utils'
import { useCommunity } from '../../hooks'

const CommunitySelect = styled(Select)({
  float: 'left',
  'min-width': '150px'
})

const CommunitySelector = ({ handleSelection, placeHolder, disabled }) => {
  const [activeCommunity, setActiveCommunity] = useState(placeHolder)
  const { data, loading, error } = useCommunity()

  const switchActiveCommunity = (event) => {
    if (event && event.target.value && !disabled) {
      setActiveCommunity(event.target.value)
      handleSelection(event)
    }
  }

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const communities = data.community

  return (
    <CommunitySelect
      labelId='input-label'
      value={activeCommunity}
      onChange={switchActiveCommunity}
    >
      <MenuItem value={placeHolder} >
        <em>
          {capitalize(placeHolder.name)}
        </em>
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

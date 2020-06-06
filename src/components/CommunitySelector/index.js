import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const CommunitySelect = styled(Select)({
  margin: '5px'
})

const CommunitySelector = ({ handleSelection }) => {
  const communities = useSelector(state => state.communities)
  const [activeCommunity, setActiveCommunity] = useState(communities[0])

  const switchActiveCommunity = (event) => {
    if (event && event.target.value) {
      setActiveCommunity(event.target.value)
    }
    handleSelection(event)
  }

  return (
    <CommunitySelect
      value={activeCommunity}
      onChange={switchActiveCommunity}
    >
      {communities.map((com, i) => {
        return (
          <MenuItem
            key={i}
            value={com}>
            {com.name}
          </MenuItem>
        )
      })}
    </CommunitySelect>
  )
}

export default CommunitySelector

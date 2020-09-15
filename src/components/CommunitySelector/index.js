import React, {
  useState, useEffect
} from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Select,
  MenuItem
} from '@material-ui/core'
import {
  gql, useQuery
} from '@apollo/client'

import { capitalize } from '../../utils'

const CommunitySelect = styled(Select)({
  float: 'left',
  'min-width': '150px'
})

const GET_USER_ROLES = gql`
  query userRoles($did: String) {
    userRoles(did: $did) {
      id
      role
      community {
        name
        txId
      }
      transaction {
        blockHash
      }
    }
  }
`

const CommunitySelector = ({ handleSelection, placeHolder, disabled }) => {
  const [activeCommunity, setActiveCommunity] = useState(placeHolder)

  const switchActiveCommunity = (event) => {
    if (event && event.target.value && !disabled) {
      setActiveCommunity(event.target.value)
      handleSelection(event)
    }
  }

  const communities = [{
    name: 'fake'
  }]

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

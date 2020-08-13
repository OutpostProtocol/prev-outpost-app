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
  margin: '5px',
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

const CommunitySelector = ({ handleSelection, placeHolder }) => {
  const [activeCommunity, setActiveCommunity] = useState(placeHolder)
  const [communities, setCommunities] = useState([])
  const did = useSelector(state => state.did)

  const { data } = useQuery(GET_USER_ROLES, {
    variables: {
      did
    },
    skip: (typeof window === 'undefined' || !window.box)
  })

  useEffect(() => {
    const coms = {}
    const roles = data ? data.userRoles : []
    for (let i = 0; i < roles.length; i++) {
      const current = roles[i].community
      coms[current.txId] = current
    }

    setCommunities(Object.values(coms))
  }, [data])

  const switchActiveCommunity = (event) => {
    if (event && event.target.value) {
      setActiveCommunity(event.target.value)
    }
    handleSelection(event)
  }

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

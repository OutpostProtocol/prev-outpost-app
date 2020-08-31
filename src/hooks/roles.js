import {
  useState, useEffect
} from 'react'
import {
  gql, useQuery
} from '@apollo/client'
import { ROLES } from 'outpost-protocol'

export const GET_USER_ROLES = gql`
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

export const useRoles = (did, communityTxId) => {
  const [roles, setRoles] = useState([])
  const { data } = useQuery(GET_USER_ROLES, {
    variables: {
      did
    },
    skip: (typeof window === 'undefined' || !window.box)
  })

  useEffect(() => {
    const comRoles = data && data.userRoles.filter(role => role.community.txId === communityTxId)

    setRoles(comRoles)
  }, [communityTxId, data])
  return roles
}

export const useHasAdminRole = (did, communityTxId) => {
  const [hasAdminRole, setHasAdminRole] = useState(false)
  const roles = useRoles(did, communityTxId)

  useEffect(() => {
    const govRoles = roles && roles.filter(role => {
      const roleTitle = role.role
      return roleTitle === ROLES.OWNER || roleTitle === ROLES.ADMIN
    })

    setHasAdminRole(govRoles && govRoles.length > 0)
  }, [roles])
  return hasAdminRole
}

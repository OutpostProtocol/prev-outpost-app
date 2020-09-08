import {
  gql,
  useQuery
} from '@apollo/client'

import { ROLES } from 'outpost-protocol'

export const GET_ALL_COMMUNITIES = gql`
  query {
    community {
      id
      name
      txId
      isOpen
      blockHash
    }
  }`

/**
 * Get all communities
 *
 * @returns {Object} All the communities
 */
export const useCommunities = () => {
  return useQuery(GET_ALL_COMMUNITIES)
}

/**
 * Get a community
 *
 * @returns {Object} a community
 */
export const useCommunity = (id) => {
  const GET_COMMUNITY = gql`
    query community($txIds: [String]) {
      community(txIds: $txIds) {
        id
        name
        txId
        isOpen
        blockHash
      }
    }
  `
  const { loading, error, data } = useQuery(
    GET_COMMUNITY,
    {
      variables: {
        txIds: [id]
      }
    })

  return { data, loading, error }
}

/**
 * Get the owners, admins, moderators, and members for a community
 *
 * @param   {String}  id  of the community to get the roles for
 *
 * @returns {Object}      The owners, admins, moderators, and members of a community
 */
export const useCommunityRoles = (id) => {
  const GET_COMMUNITY_ROLES = gql`
    query roles($id: String!) {
      roles(communityTxId: $id) {
        role
        user {
          did
          name
        }
      }
    }
  `
  const { loading, error, data } = useQuery(
    GET_COMMUNITY_ROLES,
    {
      variables: {
        id: id
      }
    }
  )

  const owners = []
  const admins = []
  const moderators = []
  const members = []

  if (data && data.roles) {
    for (const result of data.roles) {
      const { role, user } = result
      switch (role) {
        case ROLES.OWNER:
          owners.push(user.did)
          break
        case ROLES.ADMIN:
          admins.push(user.did)
          break
        case ROLES.MODERATOR:
          moderators.push(user.did)
          break
        case ROLES.MEMBER:
          members.push(user.did)
          break
        default:
          console.error('Unrecognized role', role)
      }
    }
  }

  if (loading || error) return {}
  else return { owners, admins, moderators, members }
}

export const usePost = (txId) => {
  const GET_POST = gql`
    query posts($txId: String!) {
      posts(txId: $txId) {
        title
        postText
        subtitle
        timestamp
        community {
          name
        }
        user {
          did
        }
        transaction {
          txId
          blockHash
        }
      }
    }
  `
  return useQuery(
    GET_POST,
    {
      variables: {
        txId: txId
      }
    }
  )
}

export const useUser = (did) => {
  const GET_USER = gql`
    query user($did: String) {
      user(did: $did) {
        name,
        id
      }
    }
    `
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      did: did
    }
  })

  return { data, loading, error }
}

export const useIsNameAvailable = (name) => {
  const IS_NAME_AVAILABLE = gql`
    query isNameAvailable($name: String!) {
      isNameAvailable(name: $name)
    }
  `

  return useQuery(IS_NAME_AVAILABLE, {
    variables: {
      name: name
    }
  })
}

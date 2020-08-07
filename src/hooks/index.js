import {
  gql,
  useQuery
} from '@apollo/client'

import { ROLES } from 'outpost-protocol'

/**
 * Get all communities
 *
 * @returns {Object} All the communities
 */
export const useCommunities = () => {
  const GET_ALL_COMMUNITIES = gql`
    query {
      Community {
        id
        name
        txId
        isOpen
        blockHash
      }
    }
  `
  const { loading, error, data } = useQuery(GET_ALL_COMMUNITIES)

  return { data, loading, error }
}

/**
 * Get a community
 *
 * @returns {Object} a community
 */
export const useCommunity = (id) => {
  const GET_COMMUNITY = gql`
    query Community($txIds: [String]) {
      Community(txIds: $txIds) {
        id
        name
        txId
        isOpen
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
    query getAllCommunityRoles($id: String!) {
      getAllCommunityRoles(communityTxId: $id) {
        role
        user {
          did
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

  if (data) {
    for (const result of data.getAllCommunityRoles) {
      const { role, user } = result
      switch (role) {
        case ROLES.Owner:
          owners.push(user.did)
          break
        case ROLES.Admin:
          admins.push(user.did)
          break
        case ROLES.Moderator:
          moderators.push(user.did)
          break
        case ROLES.Member:
          members.push(user.did)
          break
        default:
          console.error('Unrecognized role', role)
      }
    }
  }

  if (loading || error) return []
  else return { owners, admins, moderators, members }
}

/**
 * Get a users roles within a community
 *
 * @param   {String}  did of the user
 * @param   {String}  id  of the community
 *
 * @returns {Object}      The user's roles within the community
 */
export const useUserRolesForCommunity = (did, id) => {
  const GET_USER_COMMUNITY_ROLES = gql`
    query getUserRolesForCommunity($did: String!, $id: String!) {
      getUserRolesForCommunity(did: $did, id: $id) {
        role
      }
    }
  `
  const { data } = useQuery(
    GET_USER_COMMUNITY_ROLES,
    {
      variables: {
        did: did,
        id: id
      }
    }
  )

  const roles = {
    isOwner: false,
    isAdmin: false,
    isModerator: false,
    isMember: false
  }

  if (data) {
    for (const result of data.getUserRolesForCommunity) {
      const { role } = result
      switch (role) {
        case ROLES.Owner:
          roles.isOwner = true
          break
        case ROLES.Admin:
          roles.isAdmin = true
          break
        case ROLES.Moderator:
          roles.isModerator = true
          break
        case ROLES.Member:
          roles.isMember = true
          break
        default:
          console.error('Unrecognized role', role)
      }
    }
  }

  return roles
}

export const usePost = (txId) => {
  const GET_POST = gql`
    query Posts($txId: String!) {
      Posts(txId: $txId) {
        txId
        title
        body
        subtitle
        timestamp
        community {
          name
        }
        user {
          did
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

/**
 * Checks if a user has a name
 *
 * @param   {String}  did of the user
 *
 * @returns {String}      if the user has a name
 */
export const useHasName = (did) => {
  const HAS_USERNAME = gql`
    query hasUsername($did: String) {
      hasUsername(did: $did)
    }
  `

  return useQuery(
    HAS_USERNAME,
    {
      variables: {
        did: did
      }
    })
}

/**
 * Set a user's name
 *
 * @param   {String}  did   of the user
 * @param   {String}  name  to give the user
 *
 * @returns {Boolean}       if it was successfully set
 */
export const useSetName = (did, name) => {
  const HAS_USERNAME = gql`
    query hasUsername($did: String, $name: String) {
      setUsername(did: $did, name: $name)
    }
  `

  return useQuery(
    HAS_USERNAME,
    {
      variables: {
        did: did,
        name: name
      }
    })
}

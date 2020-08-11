import {
  gql,
  useQuery
} from '@apollo/client'

/**
 * Get all communities
 *
 * @returns {Object} All the communities
 */
export const useCommunities = () => {
  const GET_ALL_COMMUNITIES = gql`
    query {
      community {
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

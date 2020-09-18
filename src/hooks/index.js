import {
  gql,
  useQuery
} from '@apollo/client'

export const GET_ALL_COMMUNITIES = gql`
  query {
    community {
      id
      name
      txId
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
export const useCommunity = () => {
  const JAMM_ID = '8JMaFtKxfPD8IC2xBRhbdWeTVjl1FUn0F9InNa_f05I'

  const GET_COMMUNITY = gql`
    query community($txIds: [String]) {
      community(txIds: $txIds) {
        id
        name
        txId
        tokenAddress
        tokenSymbol
        description
        imageTxId
        readRequirement
        owner
      }
    }
  `
  const { loading, error, data } = useQuery(
    GET_COMMUNITY,
    {
      variables: {
        txIds: [JAMM_ID]
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

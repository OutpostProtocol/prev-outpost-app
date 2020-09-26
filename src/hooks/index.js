import {
  gql,
  useQuery
} from '@apollo/client'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import { ERROR_TYPES } from '../constants'

export const useErrorReporting = (type, error, request) => {
  const mixpanel = useMixpanel()
  if (error?.message) {
    const info = {
      type,
      message: error.message,
      request
    }
    mixpanel.track('Error', info)
  }
}

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
  const result = useQuery(GET_ALL_COMMUNITIES)
  useErrorReporting(ERROR_TYPES.query, result?.error, 'GET_ALL_COMMUNITIES')
  return result
}

/**
 * Get a community
 *
 * @returns {Object} a community
 */
export const useCommunity = () => {
  const JAMM_ID = 'JAMM_ID' // '8vhfYMA19OnOjKq1l_zDd7sn2dmOAUL1xEbDhfgCcSo'

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
  useErrorReporting(ERROR_TYPES.query, error, 'GET_COMMUNITY')
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
  useErrorReporting(ERROR_TYPES.query, error, 'GET_USER')
  return { data, loading, error }
}

export const useIsNameAvailable = (name) => {
  const IS_NAME_AVAILABLE = gql`
    query isNameAvailable($name: String!) {
      isNameAvailable(name: $name)
    }
  `

  const result = useQuery(IS_NAME_AVAILABLE, {
    variables: {
      name: name
    }
  })
  useErrorReporting(ERROR_TYPES.query, result?.error, 'IS_NAME_AVAILABLE')
  return result
}

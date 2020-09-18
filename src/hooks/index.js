import {
  useState, useEffect
} from 'react'
import {
  gql,
  useQuery
} from '@apollo/client'
import Box from '3box'

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
  const JAMM_ID = '8vhfYMA19OnOjKq1l_zDd7sn2dmOAUL1xEbDhfgCcSo'

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

export const use3boxProf = (did) => {
  const [profImage, setProfImage] = useState(null)
  const [name, setName] = useState(null)

  useEffect(() => {
    const setProfile = async () => {
      const profile = await Box.getProfile(did)

      if (profile.name) {
        setName(profile.name)
      }

      const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
      if (hash) {
        const imgSrc = `https://ipfs.infura.io/ipfs/${hash}`
        setProfImage(imgSrc)
      }
    }

    setProfile()
  }, [did])

  return {
    profImage,
    name
  }
}

import {
  useState, useEffect
} from 'react'
import {
  gql,
  useLazyQuery,
  useQuery
} from '@apollo/client'
import { useErrorReporting } from './index'
import {
  ERROR_TYPES, LOGIN_TOKEN
} from '../constants'
import useAuth from './useAuth'
import { useWeb3React } from '@web3-react/core'
import store from 'store'

export const GET_POSTS = gql`
  query posts($communityTxId: String) {
    posts (communityTxId: $communityTxId) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      community {
        name
        txId
        readRequirement
        tokenSymbol
      }
      user {
        did
      }
    }
  }
  `

export const GET_POST = gql`
  query getPost($txId: String!) {
    getPost(txId: $txId) {
      post {
        id
        title
        postText
        subtitle
        timestamp
        canonicalLink
        txId
        community {
          name
          txId
        },
        user {
          did
        },
        comments {
          postText
          timestamp
          user {
            did
          }
        }
      }
      userBalance
      readRequirement
      tokenSymbol
      tokenAddress
    }
  }
`

const GET_PREVIEW = gql`
  query posts($txId: String!) {
    postPreview (txId: $txId) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      canonicalLink
    }
  }
`

export const usePostPreview = (txId) => {
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [image, setImage] = useState(null)
  const [canonicalLink, setCanonicalLink] = useState(null)

  const { data, error, loading } = useQuery(GET_PREVIEW, {
    variables: { txId }
  })
  useErrorReporting(ERROR_TYPES.query, data?.error, 'GET_PREVIEW')
  useEffect(() => {
    if (!loading && !error) {
      const preview = data.postPreview
      setCanonicalLink(preview.canonicalLink)
      setTitle(preview.title)
      setDescription(preview.subtitle)
      setImage(preview.featuredImg)
    }
  }, [data, loading, error])

  return {
    title,
    description,
    image,
    canonicalLink
  }
}

const usePosts = (communityTxId) => {
  const result = useQuery(GET_POSTS, {
    variables: { communityTxId }
  })
  useErrorReporting(ERROR_TYPES.query, result?.error, 'GET_POSTS')
  return result
}

export const useOnePost = (txId) => {
  const { isGettingToken } = useAuth()
  const { account } = useWeb3React()
  const [postData, setPostData] = useState()
  const [curAccount, setCurAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [getPost, { data, error }] = useLazyQuery(GET_POST, {
    variables: {
      txId
    },
    fetchPolicy: 'network-only',
    context: {
      headers: {
        authorization: store.get(`${LOGIN_TOKEN}.${account}`) || null
      }
    }
  })

  useEffect(() => {
    if (account && (account !== curAccount) && !isGettingToken) {
      setCurAccount(account)
      getPost()
    }
  }, [account, curAccount, setCurAccount, getPost, isGettingToken])

  useEffect(() => {
    if (data) {
      setPostData(data.getPost)
      setLoading(false)
    }
  }, [data])

  useErrorReporting(ERROR_TYPES.query, error, 'GET_ONE_POST')
  return { postData, loading }
}

export default usePosts

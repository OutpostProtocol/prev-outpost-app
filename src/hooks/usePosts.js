import {
  gql,
  useQuery
} from '@apollo/client'

export const GET_POSTS = gql`
  query posts($communityTxId: String) {
    posts (communityTxId: $communityTxId) {
      id
      title
      subtitle
      timestamp
      txId
      community {
        name
        txId
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

const usePosts = (communityTxId) => {
  return useQuery(GET_POSTS, {
    variables: { communityTxId }
  })
}

export const useOnePost = (txId) => {
  return useQuery(GET_POST, {
    variables: {
      txId
    },
    fetchPolicy: 'network-only'
  })
}

export default usePosts

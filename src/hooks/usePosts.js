import {
  gql,
  useQuery
} from '@apollo/client'

export const GET_POSTS = gql`
  query posts($communityTxId: String) {
    posts (communityTxId: $communityTxId) {
      id
      title
      postText
      subtitle
      timestamp
      community {
        name
        txId
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

export const GET_POST = gql`
  query posts($txId: String!) {
    posts(txId: $txId) {
      id
      title
      postText
      subtitle
      timestamp,
      canonicalLink,
      community {
        name
        txId
      },
      user {
        did
      },
      transaction {
        txId
        blockHash
      },
      comments {
        postText
        timestamp
        user {
          did
        }
      }
    }
  }
`

const usePosts = (communityTxId) => {
  return useQuery(GET_POSTS, {
    variables: { communityTxId }
  })
}

export const useOnePost = (txId) => {
  return useQuery(
    GET_POST,
    {
      variables: {
        txId: txId
      }
    }
  )
}

export default usePosts

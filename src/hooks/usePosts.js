import {
  gql,
  useQuery
} from '@apollo/client'

const usePosts = (communityTxId) => {
  const GET_POSTS = gql`
    query posts($communityTxId: String) {
      posts (communityTxId: $communityTxId) {
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

  return useQuery(GET_POSTS, {
    variables: { communityTxId },
    pollInterval: 2000
  })
}

export const useOnePost = (txId) => {
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

export default usePosts

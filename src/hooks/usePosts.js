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
    variables: { communityTxId }
  })
}

export default usePosts

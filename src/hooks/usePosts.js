import {
  gql,
  useQuery
} from '@apollo/client'

const usePosts = (communityTxId) => {
  const GET_POSTS = gql`
    query Posts($communityTxId: String) {
      Posts (communityTxId: $communityTxId) {
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

import {
  gql,
  useQuery
} from '@apollo/client'

const usePosts = (isLoggedIn, communities) => {
  const GET_POSTS = gql`
    query {
      Posts {
        txId
        title
        body
        subtitle
        timestamp
        community {
          name
        }
        user {
          did
        }
      }
    }
  `

  return useQuery(GET_POSTS)
}

export default usePosts

import React from 'react'
import { styled } from '@material-ui/core/styles'

import usePosts from '../../hooks/usePosts'
import PostPreview from '../PostPreview'

const FeedContainer = styled('div')({
  'margin-top': '10vh'
})

const Feed = () => {
  const { data, loading, error } = usePosts()

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const posts = data.Posts

  return (
    <FeedContainer>
      {posts.map((post, i) => {
        return (
          <PostPreview
            post={post}
            preview={true}
            key={i}
          />
        )
      })
      }
    </FeedContainer>
  )
}

export default Feed

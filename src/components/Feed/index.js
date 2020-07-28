import React from 'react'
import { styled } from '@material-ui/core/styles'

import PostPreview from '../PostPreview'

const FeedContainer = styled('div')({
  'margin-top': '10vh'
})

const Feed = ({ posts }) => {
  if (posts) {
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
  } else {
    return (
      <div />
    )
  }
}

export default Feed

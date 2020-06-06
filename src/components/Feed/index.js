import React from 'react'
import { styled } from '@material-ui/core/styles'

import Post from '../Post'

const FeedContainer = styled('div')({
  'margin-top': '5px'
})

const Feed = ({ posts }) => {
  if (posts) {
    return (
      <FeedContainer>
        {posts.map((post, i) => {
          return (
            <Post
              post={post}
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

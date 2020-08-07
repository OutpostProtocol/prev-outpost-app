import React from 'react'

import PostPreview from '../PostPreview'

const Feed = ({ posts }) => {
  return (
    <>
      {posts && posts.map((post, i) => {
        return (
          <PostPreview
            post={post}
            key={i}
          />
        )
      })
      }
    </>
  )
}

export default Feed

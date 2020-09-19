import React from 'react'
import Loadable from '@loadable/component'

const PostPreview = Loadable(() => import('../PostPreview'))

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

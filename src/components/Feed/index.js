import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import PostPreview from '../PostPreview'
import usePosts from '../../hooks/usePosts'

const ProgressContainer = styled('div')({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center'
})

const Feed = () => {
  const { data, loading } = usePosts()

  if (loading) {
    return (
      <ProgressContainer>
        <CircularProgress />
      </ProgressContainer>
    )
  }

  const { posts } = data

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

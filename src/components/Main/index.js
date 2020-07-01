import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'

import { usePosts } from '../../hooks'
import Feed from '../Feed'
import NewPost from '../NewPost'

const MainContainer = styled('div')({
  padding: '1em',
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const communities = useSelector(state => state.communities)
  const { posts, error } = usePosts(isLoggedIn, communities)
  console.log('error from usePosts', error)

  return (
    <MainContainer>
      { isLoggedIn &&
        <NewPost />
      }
      <Feed
        posts={posts}
      />
    </MainContainer>
  )
}

export default Main

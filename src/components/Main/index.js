import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'

import { usePosts } from '../../hooks'
import Feed from '../Feed'
import Toolbar from '../Toolbar'

const MainContainer = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const communities = useSelector(state => state.communities)
  const { posts } = usePosts(isLoggedIn, communities)

  return (
    <MainContainer>
      { isLoggedIn &&
        <Toolbar />
      }
      <Feed
        posts={posts}
      />
    </MainContainer>
  )
}

export default Main

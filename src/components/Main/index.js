import React from 'react'
import { styled } from '@material-ui/core/styles'

import Feed from '../Feed'
import usePosts from '../../hooks/usePosts'

const MainContainer = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = () => {
  const { data, loading, error } = usePosts()

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const posts = data.Posts

  return (
    <MainContainer>
      <Feed posts={posts} />
    </MainContainer>
  )
}

export default Main

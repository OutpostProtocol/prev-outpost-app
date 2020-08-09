import React from 'react'
import { styled } from '@material-ui/core/styles'

import Feed from '../Feed'
import usePosts from '../../hooks/usePosts'

const MainContainer = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw',
  'margin-top': '4em',
  'padding-top': '5vh'
})

const Main = () => {
  const { data, loading, error } = usePosts()

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <MainContainer>
      <Feed
        posts={data.posts}
      />
    </MainContainer>
  )
}

export default Main

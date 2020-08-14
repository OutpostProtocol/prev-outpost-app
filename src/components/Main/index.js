import React from 'react'
import { styled } from '@material-ui/core/styles'

import Feed from '../Feed'
import usePosts from '../../hooks/usePosts'

const MainContainer = styled('div')({
  '@media only screen and (min-width: 700px)': {
    'padding-left': '23vw',
    'padding-right': '23vw',
    'padding-top': '5vh',
    'margin-top': '4em'
  }
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

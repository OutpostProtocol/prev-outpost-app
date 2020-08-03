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

  return (
    <MainContainer>
      <Feed posts={data.Posts} />
    </MainContainer>
  )
}

export default Main

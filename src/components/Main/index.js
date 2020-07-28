import React from 'react'
import { styled } from '@material-ui/core/styles'

import Feed from '../Feed'

const MainContainer = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = ({ posts }) => {
  return (
    <MainContainer>
      <Feed
        posts={posts}
      />
    </MainContainer>
  )
}

export default Main

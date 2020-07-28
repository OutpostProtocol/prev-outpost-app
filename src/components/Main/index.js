import React from 'react'
import { styled } from '@material-ui/core/styles'

import Feed from '../Feed'

const MainContainer = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const Main = () => {
  return (
    <MainContainer>
      <Feed
        posts={null}
      />
    </MainContainer>
  )
}

export default Main

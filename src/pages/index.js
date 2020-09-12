import React from 'react'
import { styled } from '@material-ui/core/styles'

import usePosts from '../hooks/usePosts'
import SEO from '../components/seo'
import Feed from '../components/Feed'
import Toolbar from '../components/Toolbar'
import MastHead from '../components/MastHead'

const FeedContainer = styled('div')({
  '@media only screen and (min-width: 700px)': {
    'padding-left': '23vw',
    'padding-right': '23vw',
    'padding-top': '5vh',
    'margin-top': '4em'
  }
})

const IndexPage = () => {
  const { data, loading, error } = usePosts()

  if (loading) return null
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <SEO title="Home" />
      <Toolbar />
      <MastHead />
      <FeedContainer>
        <Feed
          posts={data.posts}
        />
      </FeedContainer>
    </ div>
  )
}

export default IndexPage

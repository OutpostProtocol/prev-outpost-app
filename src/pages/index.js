import React from 'react'
import { styled } from '@material-ui/core/styles'
import Loadable from '@loadable/component'

import usePosts from '../hooks/usePosts'
import SEO from '../components/seo'
import Feed from '../components/Feed'
import Toolbar from '../components/Toolbar'

const MastHead = Loadable(() => import('../components/MastHead'))

const FeedContainer = styled('div')({
  '@media only screen and (min-width: 700px)': {
    width: '70vw',
    margin: '0 auto 15vh',
    'padding-top': '5vh'
  }
})

const FeedHeader = styled('div')({
  color: '#6C6C6C',
  'margin-bottom': '10px'
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
        <FeedHeader>
          READ THE LATEST
        </FeedHeader>
        <Feed
          posts={data.posts}
        />
      </FeedContainer>
    </ div>
  )
}

export default IndexPage

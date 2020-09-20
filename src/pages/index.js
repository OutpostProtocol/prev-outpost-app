import React from 'react'
import { styled } from '@material-ui/core/styles'

import usePosts from '../hooks/usePosts'
import SEO from '../components/seo'
import Feed from '../components/Feed'
import Toolbar from '../components/Toolbar'
import MastHead from '../components/MastHead'

const FeedContainer = styled('div')({
  '@media only screen and (min-width: 800px)': {
    width: '70vw'
  },
  width: '95vw',
  margin: '0 auto 15vh',
  'padding-top': '5vh'
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
      <SEO
        title='Outpost'
        image='https://arweave.net/YTut0yDqWiDt3-5xM0Y8Lskp68wY2OxCVBHxB4mdCd4'
      />
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

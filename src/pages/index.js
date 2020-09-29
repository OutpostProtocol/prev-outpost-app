import React from 'react'
import { styled } from '@material-ui/core/styles'

import usePosts from '../hooks/usePosts'
import PageLoading from '../components/pageLoading'
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

const Container = styled('div')({
  'overflow-x': 'hidden'
})

const IndexPage = () => {
  const { data, loading, error } = usePosts()

  if (loading) return (<PageLoading />)
  if (error) return `Error! ${error.message}`

  return (
    <Container>
      <SEO
        title='Home'
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
    </ Container>
  )
}

export default IndexPage

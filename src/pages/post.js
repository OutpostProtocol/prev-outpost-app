import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import Post from '../components/Post'
import SEO from '../components/seo'

const PostContainer = styled('div')({
  width: '50vw',
  margin: '0 auto'
})

const PostPage = ({ location }) => {
  if (!location.state.post) {
    navigate('/')
  }

  return (
    <>
      <SEO title="Post" />
      <IconButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </IconButton>
      <PostContainer>
        <Post
          post={location.state.post}
        />
      </PostContainer>
    </ >
  )
}

export default PostPage

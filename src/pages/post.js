import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'

const PostContainer = styled('div')({
  width: '50vw',
  margin: '20px auto'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  'z-index': 2
})

const PostPage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  if (!location.state.post) {
    navigate('/')
  }

  return (
    <>
      <SEO title="Post" />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </BackButton>
      { isLoggedIn &&
        <Toolbar />
      }
      <PostContainer>
        <Post
          post={location.state.post}
          preview={false}
        />
      </PostContainer>
    </ >
  )
}

export default PostPage

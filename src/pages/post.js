import React from 'react'
import { navigate } from '@reach/router'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { useOnePost } from '../hooks/usePosts'
import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'
import { PLACEHOLDER_POST } from '../constants'
import {
  getBackPath,
  getId
} from '../utils'

const PostContainer = styled('div')({
  margin: '3em 0',
  '@media only screen and (min-width: 700px)': {
    padding: '10vh 23vw'
  }
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const PostPage = ({ location }) => {
  const backPath = getBackPath(location)
  const txId = getId(location, '/post/')
  const { data, loading, error } = useOnePost(txId)

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const post = data && data.posts && data.posts[0] ? data.posts[0] : PLACEHOLDER_POST

  return (
    <>
      <SEO
        title="Post"
      />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate(backPath)}
      >
        <ChevronLeftIcon />
      </BackButton>
      <Toolbar />
      <PostContainer>
        <Post
          post={post}
        />
      </PostContainer>
    </ >
  )
}

export default PostPage

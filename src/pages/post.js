import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { useSelector } from 'react-redux'
import { navigate } from '@reach/router'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import { usePost } from '../hooks'
import { PLACEHOLDER_POST } from '../constants'
import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'

const PostContainer = styled('div')({
  margin: '3em 0',
  padding: '10vh 23vw'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const PostPage = ({ location }) => {
  const backPath = (location.state && location.state.from) ? location.state.from : '/'
  let txId = location.href.split('/post/')[1]
  txId = txId.replace('/', '')
  const { data } = usePost(txId)
  const isMounted = useRef(true)
  const [post, setPost] = useState(PLACEHOLDER_POST)
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  useEffect(() => {
    if (data && data.Posts && data.Posts[0] && isMounted.current) setPost(data.Posts[0])
    return () => { isMounted.current = false }
  }, [data])

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
      { isLoggedIn &&
        <Toolbar />
      }
      <PostContainer>
        <Post
          post={post}
          preview={false}
        />
      </PostContainer>
    </ >
  )
}

export default PostPage

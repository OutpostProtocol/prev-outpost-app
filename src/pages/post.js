import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from '@reach/router'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons'
import Iframe from 'react-iframe'

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
    padding: '0 23vw 10vh'
  }
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const IframeContainer = styled('div')({
  margin: '3em auto',
  width: '80%',
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
  'font-size': '30px',
  'text-align': 'center'
})

const StyledIFrame = styled(Iframe)({
  'border-radius': '10px'
})

const MessageContainer = styled('div')({
  padding: '0.5em',
  'max-width': '30%'
})

const Message = styled('div')({
  'margin-bottom': '30px'
})

const SignInMessage = styled('div')({
  height: '100vh',
  'text-align': 'center',
  'font-size': '30px',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'center'
})

const PostPage = ({ location }) => {
  const did = useSelector(state => state.did)

  const backPath = getBackPath(location)
  const txId = getId(location, '/post/')

  const { data, loading, error } = useOnePost(txId, did)

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const post = data && data.posts && data.posts[0] ? data.posts[0] : PLACEHOLDER_POST

  const MINIMUM_REQUIRED = 1000

  const PostLayout = ({ children }) => (
    <>
      <SEO
        title="Post"
        canonical={post.canonicalLink}
      />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate(backPath)}
      >
        <ChevronLeft />
      </BackButton>
      <Toolbar />
      <>
        {children}
      </>
    </>
  )

  if (!did) {
    return (
      <PostLayout>
        <SignInMessage>
          <div>
            You must sign in to view this post ➚
          </div>
        </SignInMessage>
      </PostLayout>
    )
  }

  const isInsufficientBalance = data.userBalance < MINIMUM_REQUIRED
  if (isInsufficientBalance) {
    return (
      <PostLayout>
        <IframeContainer>
          <MessageContainer>
            <Message>
              You need {MINIMUM_REQUIRED} $JAMM to access this post.
            </Message>
            <Message>
              Your Balance: {data.userBalance}
            </Message>
            <Message>
              Buy $JAMM on uniswap ➔
            </Message>
          </MessageContainer>
          <StyledIFrame
            url="https://uniswap.exchange/?outputCurrency=0x56687cf29ac9751ce2a4e764680b6ad7e668942e"
            height={'600px'}
            width={'700px'}
            frameBorder="0"
            style={{ border: 'none', outline: 'none', 'border-radius': '10px' }}
            display="initial"
            position="relative"
          />
        </ IframeContainer>
      </PostLayout>
    )
  }

  return (
    <PostLayout>
      <PostContainer>
        <Post
          post={post}
        />
      </PostContainer>
    </PostLayout>
  )
}

export default PostPage

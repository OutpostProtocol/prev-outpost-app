import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import Iframe from 'react-iframe'

import { useOnePost } from '../hooks/usePosts'
import Post from '../components/Post'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'
import {
  getBackPath,
  getId
} from '../utils'

const PostContainer = styled('div')({
  margin: '5em 0',
  padding: '0 20px',
  '@media only screen and (min-width: 700px)': {
    padding: '0 20vw 10vh',
    margin: '10vh auto',
    'max-width': '1000px'
  }
})

const IframeContainer = styled('div')({
  margin: '3em auto',
  width: '80%',
  display: 'flex',
  'justify-content': 'space-between',
  'align-items': 'center',
  'font-size': '30px',
  'text-align': 'center',
  '@media only screen and (max-width: 800px)': {
    'flex-direction': 'column',
    width: '95%'
  }
})

const StyledIFrame = styled(Iframe)({
  'border-radius': '10px'
})

const MessageContainer = styled('div')({
  padding: '0.5em',
  'max-width': '30%',
  '@media only screen and (max-width: 800px)': {
    'max-width': '100vw'
  }
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

  if (!did) {
    return (
      <PostLayout
        backPath={backPath}
      >
        <SignInMessage>
          <div>
            You must sign in to view this post ➚
          </div>
        </SignInMessage>
      </PostLayout>
    )
  }

  return (
    <LoggedInPost
      backPath={backPath}
      txId={txId}
    />
  )
}

const PostLayout = ({ children, canonicalLink, backPath }) => (
  <>
    <SEO
      title="Post"
      canonical={canonicalLink}
    />
    <Toolbar
      backPath={backPath}
    />
    <>
      {children}
    </>
  </>
)

const LoggedInPost = ({ backPath, txId }) => {
  const { data, loading, error } = useOnePost(txId)

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const { userBalance, readRequirement, tokenSymbol, tokenAddress } = data.getPost

  const isInsufficientBalance = data.getPost.userBalance < data.getPost.readRequirement
  if (isInsufficientBalance) {
    return (
      <PostLayout
        backPath={backPath}
      >
        <IframeContainer>
          <MessageContainer>
            <Message>
              You need {readRequirement} ${tokenSymbol} to access this post.
            </Message>
            <Message>
              Your Balance: {userBalance}
            </Message>
            <Message>
              Buy ${tokenSymbol} on uniswap
            </Message>
          </MessageContainer>
          <StyledIFrame
            url={`https://uniswap.exchange/?outputCurrency=${tokenAddress}`}
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

  const post = data.getPost.post

  return (
    <PostLayout
      backPath={backPath}
      canonicalLink={post.canonicalLink}
    >
      <PostContainer>
        <Post
          post={post}
        />
      </PostContainer>
    </PostLayout>
  )
}

export default PostPage

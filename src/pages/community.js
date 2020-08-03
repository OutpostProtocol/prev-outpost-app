import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  Button
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons/'

import usePosts from '../hooks/usePosts'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'

const Container = styled('div')({
  'padding-left': '23vw',
  'padding-right': '23vw'
})

const CommunityToolbar = styled('div')({
  display: 'flex',
  width: '100%',
  padding: '10px',
  'justify-content': 'flex-end'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  'z-index': 2
})

const CommunityName = styled('h1')({
  'font-style': 'italic',
  'margin-right': 'auto'
})

const CommunuityPage = ({ location, data }) => {
  if (!location.state.community) {
    navigate('/')
  }

  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const { name, txId } = location.state.community
  const postReq = usePosts(txId)

  console.log(postReq, 'THE POST REQ')

  if (postReq.loading) return 'Loading...'
  if (postReq.error) return `Error! ${postReq.error.message}`

  const joinCommunity = () => {
    // TODO: send notif to moderators
  }

  return (
    <>
      <SEO
        title={name}
      />
      <BackButton
        color='inherit'
        aria-label='Go back'
        edge='end'
        onClick={() => navigate('/')}
      >
        <ChevronLeft />
      </BackButton>
      {isLoggedIn &&
        <Toolbar />
      }
      <Container>
        <CommunityToolbar>
          <CommunityName>
            {name}
          </CommunityName>
          {isLoggedIn &&
            <Button
              onClick={joinCommunity}
              disableElevation
              color='primary'
              variant='contained'
            >
              JOIN
            </Button>
          }
        </CommunityToolbar>
        <Feed
          posts={postReq.data.Posts}
        />
      </Container>
    </>
  )
}

export default CommunuityPage

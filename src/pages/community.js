import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  Button
} from '@material-ui/core'
import { ChevronLeft } from '@material-ui/icons/'

import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'
import { usePosts } from '../hooks'

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
  'margin-right': 'auto'
})

const FollowButton = styled(Button)({
  'margin-right': '10px'
})

const CommunuityPage = ({ location }) => {
  if (!location.state.community) {
    navigate('/')
  }
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const { name, symbol } = location.state.community
  const { posts } = usePosts(isLoggedIn, [location.state.community])

  const followCommunity = () => {
    // TODO: dispatch to add community
  }

  const requestToJoinCommunity = () => {
    // TODO: send notif to moderators
  }

  return (
    <>
      <SEO
        title={symbol}
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
            <>
              <FollowButton
                onClick={followCommunity}
                disableElevation
                color='primary'
                variant='contained'
              >
                Follow
              </FollowButton>
              <Button
                onClick={requestToJoinCommunity}
                disableElevation
                color='primary'
                variant='contained'
              >
                Request to Join
              </Button>
            </>
          }
        </CommunityToolbar>
        <Feed
          posts={posts}
        />
      </Container>
    </>
  )
}

export default CommunuityPage

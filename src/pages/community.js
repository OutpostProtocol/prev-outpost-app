import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  Button
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import usePosts from '../hooks/usePosts'
import { joinCommunity } from '../uploaders'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'

const Container = styled('div')({
  padding: '15vh 23vw'
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

  if (postReq.loading) return 'Loading...'
  if (postReq.error) return `Error! ${postReq.error.message}`

  const join = async () => {
    const { community } = location.state

    await joinCommunity(community.txId)
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
              onClick={join}
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

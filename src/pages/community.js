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
import { useCommunity } from '../hooks'
import { joinCommunity } from '../uploaders'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'
import PendingChip from '../components/PendingChip'
import { getId } from '../utils'

const Container = styled('div')({
  margin: '3em 0',
  padding: '10vh 23vw'
})

const CommunityToolbar = styled('div')({
  display: 'flex',
  width: '100%',
  padding: '10px',
  'justify-content': 'space-between'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const CommunityName = styled('h1')({
  'font-style': 'italic',
  'margin-right': 'auto'
})

const NameContainer = styled('div')({
  display: 'flex'
})

const pendingDescription = 'The community has been submitted but has not yet been confirmed.'

const CommunuityPage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const txId = getId(location, '/community/')
  const { data } = useCommunity(txId)
  const postReq = usePosts(txId)
  let community

  if (data && data.Community) community = data.Community[0]
  const { name, blockHash } = community || {}

  if (postReq.loading) return 'Loading...'
  if (postReq.error) return `Error! ${postReq.error.message}`

  const join = async () => {
    if (community.txId) {
      await joinCommunity(community.txId)
    }
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
          <NameContainer>
            <CommunityName>
              {name}
            </CommunityName>
            <PendingChip
              isPending={!blockHash}
              description={pendingDescription}
            />
          </NameContainer>
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

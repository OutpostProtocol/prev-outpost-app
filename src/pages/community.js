import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import usePosts from '../hooks/usePosts'
import { useCommunity } from '../hooks'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'
import BackButton from '../components/BackButton'
import {
  getId,
  isMobile
} from '../utils'

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

const CommunityName = styled('h1')({
  'font-style': 'italic'
})

const ButtonContainer = styled(Button)({
  margin: '10px',
  height: '2.5em'
})

const NameContainer = styled('div')({
  display: 'flex'
})

const CenteredContainer = styled('div')({
  display: 'flex',
  padding: '20px',
  height: '200px',
  'justify-content': 'center',
  'align-items': 'center'
})

const CommunuityPage = ({ location }) => {
  const txId = getId(location, '/community/')
  const { data, loading, error } = useCommunity(txId)
  const postReq = usePosts(txId)

  if (isMobile()) {
    return (
      <CenteredContainer>
        This page is unavailable for mobile. Come back soon or vist on a desktop.
      </CenteredContainer>
    )
  }

  let community

  if (data && data.community && data.community[0]) community = data.community[0]
  const { name } = community || {}

  if (postReq.loading || loading) return null
  if (postReq.error) return `Error! ${postReq.error.message}`
  if (error) return `Error! 3${error.message}`

  return (
    <>
      <SEO
        title={name}
      />
      <BackButton
        prevPage={'/'}
      />
      <Toolbar />
      <Container>
        <CommunityToolbar>
          <NameContainer>
            <CommunityName>
              {name}
            </CommunityName>
          </NameContainer>
        </CommunityToolbar>
        <ButtonContainer
          onClick={() => navigate('/governance/' + txId)}
          disableElevation
          color='primary'
          variant='contained'
        >
          GOVERNANCE
        </ButtonContainer>
        <Feed
          posts={postReq.data.posts}
        />
      </Container>
    </>
  )
}

export default CommunuityPage

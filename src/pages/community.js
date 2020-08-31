import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

import usePosts from '../hooks/usePosts'
import { useCommunity } from '../hooks'
import { useHasAdminRole } from '../hooks/roles'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import RoleStatus from '../components/RoleStatus'
import Feed from '../components/Feed'
import PendingChip from '../components/PendingChip'
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

const pendingDescription = 'The community has been submitted but has not yet been confirmed.'

const CommunuityPage = ({ location }) => {
  const txId = getId(location, '/community/')
  const { data, loading, error } = useCommunity(txId)
  const postReq = usePosts(txId)
  const did = useSelector(state => state.did)
  const hasAdminRole = useHasAdminRole(did, txId)

  if (isMobile()) {
    return (
      <CenteredContainer>
        This page is unavailable for mobile. Come back soon or vist on a desktop.
      </CenteredContainer>
    )
  }

  let community

  if (data && data.community && data.community[0]) community = data.community[0]
  const { name, blockHash, isOpen } = community || {}

  if (postReq.loading || loading) return null
  if (postReq.error) return `Error! ${postReq.error.message}`
  if (error) return `Error! ${error.message}`

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
            <PendingChip
              isPending={!blockHash}
              description={pendingDescription}
            />
            {hasAdminRole &&
              <Button
                onClick={() => navigate('/editCommunity/' + txId)}
              >
                EDIT
              </Button>
            }
          </NameContainer>
          <RoleStatus
            isOpen={isOpen}
            communityTxId={txId}
          />
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

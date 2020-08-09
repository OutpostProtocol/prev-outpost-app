import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  Button
} from '@material-ui/core'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import {
  gql,
  useQuery
} from '@apollo/client'

import { joinCommunity } from '../uploaders'
import SEO from '../components/seo'
import Toolbar from '../components/Toolbar'
import Feed from '../components/Feed'
import PendingChip from '../components/PendingChip'

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

const GET_COMMUNITY_DATA = gql`
  query comPageData($communityTxId: String!) {
    posts (communityTxId: $communityTxId) {
      title
      postText
      subtitle
      timestamp
      community {
        name
      }
      user {
        did
      }
      transaction {
        txId
        blockHash
      }
    }
  }
`

const CommunuityPage = ({ location }) => {
  if (!location.state.community) {
    navigate('/')
  }
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const { name, txId, blockHash, isOpen } = location.state.community

  const { loading, error, data } = useQuery(GET_COMMUNITY_DATA, {
    variables: {
      communityTxId: txId
    }
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const showJoin = isLoggedIn && isOpen

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
          <NameContainer>
            <CommunityName>
              {name}
            </CommunityName>
            <PendingChip
              isPending={!blockHash}
              description={pendingDescription}
            />
          </NameContainer>
          {showJoin &&
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
          posts={data.posts}
        />
      </Container>
    </>
  )
}

export default CommunuityPage

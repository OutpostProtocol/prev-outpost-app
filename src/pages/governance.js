import React from 'react'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Button
} from '@material-ui/core'
import { navigate } from 'gatsby'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { styled } from '@material-ui/core/styles'

import { useCommunity } from '../hooks'
import { joinCommunity } from '../uploaders'
import { getId } from '../utils'
import GovernancePanel from '../components/GovernancePanel'
import Toolbar from '../components/Toolbar'
import SEO from '../components/seo'

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  top: '0',
  left: '0',
  'z-index': 2
})

const Container = styled('div')({
  margin: '3em 0',
  padding: '10vh 23vw'
})

const CommunityName = styled('h1')({
  'font-style': 'italic',
  'margin-right': 'auto',
  'margin-bottom': '10px'
})

const CommunityToolbar = styled('div')({
  display: 'flex',
  width: '100%',
  padding: '10px',
  'justify-content': 'space-between'
})

const GovernancePage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const txId = getId(location, '/governance/')
  const { data, loading, error } = useCommunity(txId)
  const { name, isOpen } = data.community[0] || {}

  const showJoin = isLoggedIn && isOpen

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const join = async () => {
    if (txId) {
      await joinCommunity(txId)
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
        onClick={() => navigate('/community/' + txId)}
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
        <GovernancePanel
          communityTxId={txId}
        />
      </Container>
    </>
  )
}

export default GovernancePage

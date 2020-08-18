import React from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { navigate } from 'gatsby'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { styled } from '@material-ui/core/styles'

import { useCommunity } from '../hooks'
import { getId } from '../utils'
import RoleStatus from '../components/RoleStatus'
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
  padding: '10vh 15vw'
})

const CommunityName = styled('h1')({
  'font-style': 'italic',
  'margin-right': 'auto',
  'margin-bottom': '10px'
})

const CommunityToolbar = styled('div')({
  display: 'flex',
  padding: '0 8vw 10vh'
})

const GovernancePage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const txId = getId(location, '/governance/')
  const { data, loading, error } = useCommunity(txId)

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const { name, isOpen } = data ? data.community[0] : {}

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
          <RoleStatus
            isOpen={isOpen}
            communityTxId={txId}
          />
        </CommunityToolbar>
        <GovernancePanel
          communityTxId={txId}
        />
      </Container>
    </>
  )
}

export default GovernancePage
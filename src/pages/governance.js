import React from 'react'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { navigate } from 'gatsby'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { styled } from '@material-ui/core/styles'

import { useCommunity } from '../hooks'
import GovernancePanel from '../components/GovernancePanel'
import { getId } from '../utils'
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
  'margin-right': 'auto'
})

const GovernancePage = ({ location }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const txId = getId(location, '/governance/')
  const { data, loading, error } = useCommunity(txId)
  const { name } = data.community[0] || {}

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      <SEO
        title='Governance'
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
        <CommunityName>
          {name} Governance
        </CommunityName>
        <GovernancePanel
          communityTxId={txId}
        />
      </Container>
    </>
  )
}

export default GovernancePage

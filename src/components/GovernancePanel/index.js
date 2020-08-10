import React from 'react'
import { styled } from '@material-ui/core/styles'

import { useCommunityRoles } from '../../hooks'
import GovernanceTile from '../GovernanceTile'

const Container = styled('div')({
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'space-between'
})

const GovernancePanel = ({ communityTxId }) => {
  const { owners, admins, moderators, members } = useCommunityRoles(communityTxId)

  return (
    <Container>
      <GovernanceTile
        title='Owners'
        dids={owners}
      />
      <GovernanceTile
        title='Admins'
        dids={admins}
      />
      <GovernanceTile
        title='Moderators'
        dids={moderators}
      />
      <GovernanceTile
        title='Members'
        dids={members}
      />
    </ Container>
  )
}

export default GovernancePanel

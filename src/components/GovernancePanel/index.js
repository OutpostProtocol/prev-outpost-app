import React from 'react'
import { styled } from '@material-ui/core/styles'

import { useCommunityRoles } from '../../hooks'
import GovernanceRole from '../GovernanceRole'

const Container = styled('div')({
  display: 'flex',
  'flex-wrap': 'wrap',
  'justify-content': 'space-between'
})

const GovernancePanel = ({ communityTxId }) => {
  const { owners, admins, moderators, members } = useCommunityRoles(communityTxId)

  return (
    <Container>
      <GovernanceRole
        title='OWNER'
        dids={owners}
      />
      <GovernanceRole
        title='ADMINS'
        dids={admins}
      />
      <GovernanceRole
        title='MODS'
        dids={moderators}
      />
      <GovernanceRole
        title='MEMBERS'
        dids={members}
      />
    </ Container>
  )
}

export default GovernancePanel

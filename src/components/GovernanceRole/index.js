import React from 'react'
import { styled } from '@material-ui/core/styles'

import UserName from '../Profile/UserName'

const Container = styled('div')({
  display: 'block',
  width: '25%'
})

const Heading = styled('span')({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'flex-start'
})

const Title = styled('h3')({
  margin: '0px',
  color: '#c4c4c4',
  'font-weight': 100
})

const ProfileContainer = styled('div')({
  'margin-left': '10px',
  display: 'inline-block'
})

const GovernanceRole = ({ dids, title }) => {
  return (
    <Container>
      <Heading>
        <Title>
          {title}
        </Title>
      </Heading>

      {dids && dids.map((did, i) => {
        return (
          <ProfileContainer key={i}>
            <UserName
              userDid={did}
            />
          </ProfileContainer>
        )
      })}
    </Container>
  )
}

export default GovernanceRole

import React from 'react'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import Profile from '../Profile'

const Container = styled('div')({
  display: 'block'
})

const Heading = styled('span')({
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'flex-start'
})

const Title = styled('h3')({
  margin: '0px'
})

const Icon = styled(IconButton)({
  height: '40px',
  width: '40px',
  'margin-left': '10px'
})

const ProfileContainer = styled('div')({
  'margin-top': '10px',
  'margin-left': '10px'
})

const GovernanceTile = ({ dids, title }) => {
  return (
    <Container>
      <Heading>
        <Title>
          {title}
        </Title>
        <Icon>
          <Add/>
        </Icon>
      </Heading>

      {dids && dids.map((did, i) => {
        return (
          <ProfileContainer>
            <Profile
              key={i}
              address={did}
              showName={true}
              showPicture={false}
            />
          </ProfileContainer>
        )
      })}
    </Container>
  )
}

export default GovernanceTile

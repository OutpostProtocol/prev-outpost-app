import React from 'react'
import { styled } from '@material-ui/core/styles'
import moment from 'moment'

import ProfileImage from '../Profile/ProfileImage'
import UserName from '../Profile/UserName'

const Container = styled('div')({
  display: 'inline-flex',
  'align-items': 'center'
})

const Time = styled('div')({
  color: '#999'
})

const DATE_FORMAT = 'D MMMM YYYY'

const PostContext = ({ userDid, communityName, timestamp }) => {
  const time = moment.unix(timestamp).format(DATE_FORMAT)

  return (
    <Container>
      <ProfileImage
        userDid={userDid}
      />
      <div>
        <div>
          <UserName userDid={userDid} /> · {communityName}
        </div>
        <Time>
          {time}
        </Time>
      </div>
    </Container>
  )
}

export default PostContext

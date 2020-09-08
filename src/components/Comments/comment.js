import React from 'react'
import { styled } from '@material-ui/styles'

import PostContext from '../PostContext'

const CommentContainer = styled('div')({
  display: 'block',
  'margin-top': '10px'
})

const Comment = ({ comment, community }) => {
  const { user, postText, timestamp } = comment
  return (
    <>
      <PostContext
        userDid={user.did}
        communityName={community.name}
        timestamp={timestamp}
      />
      <CommentContainer>
        { postText }
      </CommentContainer>
    </>
  )
}

export default Comment

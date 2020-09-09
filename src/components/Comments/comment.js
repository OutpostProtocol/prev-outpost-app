import React from 'react'
import { styled } from '@material-ui/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import PostContext from '../PostContext'

const CommentContainer = styled('div')({
  display: 'flex',
  'align-items': 'flex-start'
})

const ContextContainer = styled(PostContext)({
  'margin-right': '80px'
})

const CommentText = styled('div')({
  width: '80%',
  'margin-left': '20px',
  'margin-top': '10px'
})

const Divider = styled('hr')({
  width: '100%',
  border: 'none',
  height: '1px',
  'background-color': '#c4c4c4',
  'margin-top': '20px'
})

const Comment = ({ comment }) => {
  const { user, postText, timestamp } = comment
  return (
    <CommentContainer>
      <ContextContainer
        userDid={user.did}
        timestamp={timestamp}
        dateFormat={'DD MMMM'}
      />
      <CommentText>
        {
          unified()
            .use(parse, { commonmark: true })
            .use(remark2react)
            .processSync(postText).result
        }
        <Divider />
      </CommentText>
    </ CommentContainer>
  )
}

export default Comment

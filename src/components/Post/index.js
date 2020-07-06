import React from 'react'
import moment from 'moment'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import Profile from '../Profile'

const PostContainer = styled('div')({
  padding: '10px',
  'border-radius': '4px',
  '&:hover': {
    'background-color': '#fafafae8'
  }
})

const PostMetaData = styled('span')({
  float: 'right',
  color: 'darkgrey',
  'margin-left': 'auto'
})

const PostContent = styled('div')({
  'margin-top': '10px'
})

const PostHeader = styled('div')({
  display: 'flex',
  height: '100%',
  'align-items': 'center'
})

const Post = ({ post }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(post.timestamp).format(TIME_FORMAT)
  const url = '/post/' + post.Id

  const handleRedirect = () => {
    navigate(url, { state: { post } })
  }

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      <PostHeader>
        <Profile
          address={post.author}
        />
        <PostMetaData>
          {post.threadName} {time}
        </PostMetaData>
      </PostHeader>
      <PostContent>
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(post.message).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default Post

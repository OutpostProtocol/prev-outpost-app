import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'

const PostContainer = styled('div')({
  padding: '10px',
  'margin-top': '15px',
  'border-radius': '4px',
  '&:hover': {
    'background-color': '#f1f1f1'
  }
})

const PostMetaData = styled('span')({
  float: 'right',
  color: 'darkgrey'
})

const PostContent = styled('span')({
  position: 'relative',
  clear: 'both',
  display: 'block',
  'margin-left': '60px'
})

const Post = ({ post }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(post.timestamp).format(TIME_FORMAT)

  return (
    <PostContainer
      onClick={() => navigate('/post', { state: { post } })}
    >
      <ProfileHover
        address={post.author}
        showName={true}
        orientation='left'
      >
      </ProfileHover>
      <PostMetaData>{post.threadName} {time}</PostMetaData>
      <PostContent>{post.message}</PostContent>
    </PostContainer>
  )
}

export default Post

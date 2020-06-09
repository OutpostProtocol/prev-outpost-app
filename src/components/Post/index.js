import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'
import { Link } from 'gatsby'
import { styled } from '@material-ui/core/styles'

const PostContainer = styled('div')({
  padding: '10px',
  'margin-top': '5px',
  'border-radius': '4px',
  '&:hover': {
    'background-color': '#fafafae8'
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

const UnstyledLink = styled(Link)({
  'text-decoration': 'none',
  color: 'black'
})

const Post = ({ post }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(post.timestamp).format(TIME_FORMAT)
  const url = '/post/' + post.Id

  return (
    <UnstyledLink
      to={url}
      state={{ post }}
    >
      <PostContainer>
        <ProfileHover
          address={post.author}
          showName={true}
          orientation='left'
        >
        </ProfileHover>
        <PostMetaData>{post.threadName} {time}</PostMetaData>
        <PostContent>{post.message}</PostContent>
      </PostContainer>
    </UnstyledLink>
  )
}

export default Post

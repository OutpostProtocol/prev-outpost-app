import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import Editor from 'rich-markdown-editor'

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

const PostContent = styled(Editor)({
  position: 'relative',
  clear: 'both',
  display: 'block',
  'margin-left': '60px'
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
      onClick={handleRedirect}>
      <ProfileHover
        address={post.author}
        showName={true}
        orientation='left'
      >
      </ProfileHover>
      <PostMetaData>{post.threadName} {time}</PostMetaData>
      <PostContent
        defaultValue={post.message}
        readOnly={true}
      >
      </PostContent>
    </PostContainer>
  )
}

export default Post

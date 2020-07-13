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
  'margin-top': '10px',
  'border-radius': '4px',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafae8'
  }
})

const PostContainerNoHover = styled('div')({
  padding: '10px',
  'margin-top': '5px',
  'border-radius': '4px'
})

const ProfileContainer = styled('div')({
  float: 'right',
  'margin-left': 'auto'
})

const PostMetaData = styled('span')({
  display: 'block'
})

const PostContent = styled('div')({
  'margin-top': '10px'
})

const PostHeader = styled('div')({
  display: 'flex',
  height: '100%',
  'align-items': 'center'
})

const PostCommunityAndDate = styled('h4')({
  color: 'darkgray',
  'margin-top': '5px'
})

const Post = ({ post, preview }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const url = '/post/' + post.Id
  const { title, subtitle, postText } = post.message

  const handleRedirect = () => {
    navigate(url, { state: { post } })
  }

  const getPreviewText = () => {
    const MAX_PREVIEW_CHARACTERS = 256
    const previewLength = postText.length < MAX_PREVIEW_CHARACTERS ? postText.length : MAX_PREVIEW_CHARACTERS
    return postText.substring(0, previewLength) + ' ...'
  }

  const Container = preview ? PostContainer : PostContainerNoHover
  const previewText = subtitle === undefined ? getPreviewText() : subtitle

  return (
    <Container
      onClick={handleRedirect}
    >
      <PostHeader>
        <PostMetaData>
          <h1>
            {title}
          </h1>
          <PostCommunityAndDate>
            {post.threadName} · {time}
          </PostCommunityAndDate>
        </PostMetaData>
        <ProfileContainer>
          <Profile
            address={post.author}
            showName={true}
          />
        </ProfileContainer>
      </PostHeader>
      {preview ? (
        <PostContent>
          {
            unified()
              .use(parse)
              .use(remark2react)
              .processSync(previewText).result
          }
        </PostContent>
      ) : (
        <PostContent>
          {
            unified()
              .use(parse)
              .use(remark2react)
              .processSync(postText).result
          }
        </PostContent>
      )
      }
    </Container>
  )
}

export default Post

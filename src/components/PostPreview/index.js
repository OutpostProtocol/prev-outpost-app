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
    'background-color': '#f4f4f4'
  }
})

const ProfileContainer = styled('div')({
  float: 'right',
  'margin-left': 'auto',
  'padding-left': '10px'
})

const PostMetaData = styled('span')({
  display: 'block'
})

const PostContent = styled('div')({
  'margin-top': '0'
})

const PostHeader = styled('div')({
  display: 'flex',
  height: '100%',
  'align-items': 'center'
})

const PostCommunityAndDate = styled('h5')({
  color: '#999',
  margin: '5px 0 0 0'
})

const Title = styled('h2')({
  margin: 0,
  '@media only screen and (max-width: 700px)': {
    'font-size': '18px'
  }
})

const PostPreview = ({ post }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const url = '/post/' + post.transaction.txId
  const { title, subtitle, postText } = post

  const handleRedirect = () => {
    navigate(url)
  }

  const getPreviewText = () => {
    const MAX_PREVIEW_CHARACTERS = 256

    if (postText.length < MAX_PREVIEW_CHARACTERS) {
      return postText
    } else {
      return postText.substring(0, MAX_PREVIEW_CHARACTERS) + '...'
    }
  }

  const previewText = subtitle || getPreviewText()

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      <PostHeader>
        <PostMetaData>
          <Title color='primary'>
            {title}
          </Title>
          <PostCommunityAndDate>
            {post.community.name} · {time}
          </PostCommunityAndDate>
        </PostMetaData>
        <ProfileContainer>
          <Profile
            address={post.user.did}
            showName={true}
            showPicture={true}
          />
        </ProfileContainer>
      </PostHeader>
      <PostContent>
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(previewText).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default PostPreview

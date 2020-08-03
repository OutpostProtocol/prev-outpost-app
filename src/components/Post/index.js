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
  marginTop: '5px',
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
  marginTop: '0'
})

const PostHeader = styled('div')({
  display: 'flex',
  height: '100%',
  'align-items': 'center'
})

const PostCommunityAndDate = styled('h5')({
  color: '#c4c4c4',
  margin: '5px 0 0 0'
})

const Title = styled('h2')({
  margin: 0
})

const Post = ({ post, preview }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const url = '/post/' + post.txId
  const { title, body } = post

  const handleRedirect = () => {
    navigate(url, { state: { post } })
  }

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
          />
        </ProfileContainer>
      </PostHeader>
      <PostContent
        style={{
          'margin-top': '5vh'
        }}
      >
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(body).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default Post

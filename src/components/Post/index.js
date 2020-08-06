import React from 'react'
import moment from 'moment'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import {
  Chip, Tooltip
} from '@material-ui/core'

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
  marginTop: 0
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

const Title = styled('h1')({
  margin: 0
})

const StatusChip = styled(Chip)({
  'border-radius': '4px',
  'background-color': '#FF5252',
  color: '#f1f1f1',
  'margin-left': '10px'
})

const pendingDescription = 'The post has been sent to the network but has not yet been confirmed.'

const Post = ({ post }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const url = '/post/' + post.txId
  const { title, postText } = post

  const handleRedirect = () => {
    navigate(url, { state: { post } })
  }

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      <PostHeader>
        <PostMetaData>
          <div>
            <Title color='primary'>
              {title}
            </Title>
            {post.blockHash ||
              <Tooltip title={pendingDescription} placement='top' enterDelay={200}>
                <StatusChip label='PENDING' />
              </Tooltip>
            }
          </div>
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
      <PostContent>
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(postText).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default Post

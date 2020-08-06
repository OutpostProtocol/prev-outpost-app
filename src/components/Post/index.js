import React from 'react'
import moment from 'moment'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import PendingChip from '../PendingChip'
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

const TitleContainer = styled('div')({
  display: 'flex'
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
          <TitleContainer>
            <Title color='primary'>
              {title}
            </Title>
            <PendingChip
              isPending={!post.transaction.blockHash}
              description={pendingDescription}
            />
          </TitleContainer>
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

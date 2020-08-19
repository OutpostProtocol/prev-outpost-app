import React from 'react'
import moment from 'moment'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import Share from '../Share'
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
  marginTop: '5vh',
  'line-height': '1.5em',
  'font-size': '1.1em'
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

const Title = styled('h1')({
  margin: 0,
  '@media only screen and (max-width: 700px)': {
    'font-size': '18px'
  }
})

const TitleContainer = styled('div')({
  display: 'flex'
})

const pendingDescription = 'The post has been sent to the network but has not yet been confirmed.'

const Post = ({ post }) => {
  const DATE_FORMAT = 'D MMMM YYYY'
  const time = moment.unix(post.timestamp).format(DATE_FORMAT)
  const { title, subtitle, postText } = post

  return (
    <PostContainer
      key={post}
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
            showPicture={true}
          />
        </ProfileContainer>
      </PostHeader>
      <Share
        url={window.location.href}
        title={title}
        description={subtitle}
      />
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

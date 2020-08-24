import React from 'react'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import Share from '../Share'
import PendingChip from '../PendingChip'
import PostContext from '../PostContext'

const PostContainer = styled('div')({
  padding: '10px',
  marginTop: '5px',
  'border-radius': '4px'
})

const PostContent = styled('div')({
  marginTop: '5vh',
  'line-height': '1.5em',
  'font-size': '1.1em'
})

const PostHeader = styled('div')({
  height: '100%',
  'align-items': 'center'
})

const Title = styled('h1')({
  margin: 0,
  'font-size': '40px',
  '@media only screen and (max-width: 700px)': {
    'font-size': '18px'
  }
})

const TitleContainer = styled('div')({
  display: 'flex',
  'margin-bottom': '10px'
})

const SubHeader = styled('div')({
  display: 'flex',
  'justify-content': 'space-between'
})

const pendingDescription = 'The post has been sent to the network but has not yet been confirmed.'

const Post = ({ post }) => {
  const { title, subtitle, postText } = post

  return (
    <PostContainer>
      <PostHeader>
        <TitleContainer>
          <Title color='primary'>
            {title}
          </Title>
          <PendingChip
            isPending={!post.transaction.blockHash}
            description={pendingDescription}
          />
        </TitleContainer>
        <SubHeader>
          <PostContext
            userDid={post.user.did}
            communityName={post.community.name}
            timestamp={post.timestamp}
          />
          <Share
            url={window.location.href}
            title={title}
            description={subtitle}
          />
        </SubHeader>
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

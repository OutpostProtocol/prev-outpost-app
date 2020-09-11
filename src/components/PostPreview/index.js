import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import PostContext from '../PostContext'

const PostContainer = styled('div')({
  padding: '10px',
  'border-radius': '4px',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#f4f3f0'
  }
})

const PostContent = styled('div')({
  'margin-top': '17px',
  'margin-bottom': '17px'
})

const PostHeader = styled('div')({
  display: 'block'
})

const Title = styled('h1')({
  margin: 0,
  '@media only screen and (max-width: 700px)': {
    'font-size': '18px'
  }
})

const PostPreview = ({ post }) => {
  const { title, subtitle } = post

  const handleRedirect = () => {
    const url = '/post/' + post.transaction.txId
    navigate(url)
  }

  const previewText = subtitle

  return (
    <PostContainer
      onClick={handleRedirect}
    >
      <PostHeader>
        <PostContext
          userDid={post.user.did}
          communityName={post.community.name}
          timestamp={post.timestamp}
        />
        <Title color='primary'>
          {title}
        </Title>
      </PostHeader>
      <PostContent>
        {
          unified()
            .use(parse, { commonmark: true })
            .use(remark2react)
            .processSync(previewText).result
        }
      </PostContent>
    </PostContainer>
  )
}

export default PostPreview

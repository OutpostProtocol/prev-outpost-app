import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import htmlparse from 'html-react-parser'
import {
  gql,
  useMutation
} from '@apollo/client'

import Share from '../Share'
import LoadingBackdrop from '../LoadingBackdrop'
import { deletePost } from '../../uploaders/blog-post'
import { GET_POSTS } from '../../hooks/usePosts'
import { useErrorReporting } from '../../hooks'
import { ERROR_TYPES } from '../../constants'
import PostContext from '../PostContext'

const PostContainer = styled('div')({
  padding: '10px',
  marginTop: '5px',
  'border-radius': '4px'
})

const PostMetaData = styled('span')({
  display: 'block'
})

const PostContent = styled('div')({
  marginTop: '5vh',
  'margin-bottom': '17px',
  'line-height': '1.5em',
  'font-size': '1.1em'
})

const PostHeader = styled('div')({
  height: '100%',
  'align-items': 'center',
  'margin-top': '10px'
})

const Title = styled('h1')({
  margin: 0,
  'font-size': '40px'
})

const TitleContainer = styled('div')({
  display: 'flex',
  'margin-bottom': '10px'
})

const SubHeader = styled('div')({
  display: 'flex',
  'justify-content': 'space-between'
})

const ActionButton = styled(Button)({
  height: '40px',
  margin: '10px',
  'font-size': '1rem'
})

const EditMessage = styled('div')({
  'font-style': 'italic',
  margin: '10px 15px 0'
})

const AuthorActions = styled('div')({
  border: '1px solid #ccc',
  'border-radius': '4px',
  'margin-top': '20px'
})

const DELETE_POST = gql`
    mutation deletePost($txId: String!) {
      deletePost(txId: $txId)
    }
  `

const Post = ({ post }) => {
  const { title, subtitle, postText, txId, community } = post
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletePostFromDb, { error }] = useMutation(DELETE_POST)
  useErrorReporting(ERROR_TYPES.mutation, error, 'DELETE_POST')

  const isAuthor = () => {
    return false
  }

  const handleEdit = () => {
    navigate('/editor', { state: { post } })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const res = await deletePost(txId, community.txId)
    if (res.status === 200 && res.data.status === 200) {
      await deletePostFromDb({
        variables: {
          txId
        },
        refetchQueries: [{ query: GET_POSTS }]
      })
      navigate('/')
    } else {
      alert('Error deleting post')
    }
    setIsDeleting(false)
  }

  return (
    <PostContainer>
      <LoadingBackdrop isLoading={isDeleting} />
      { isAuthor() &&
        <AuthorActions>
          <EditMessage>Only you can see this message.</EditMessage>
          <ActionButton
            onClick={handleEdit}
          >
            EDIT POST
          </ActionButton>
          <ActionButton
            onClick={handleDelete}
          >
            DELETE POST
          </ActionButton>
        </AuthorActions>
      }
      <PostHeader>
        <PostMetaData>
          <TitleContainer>
            <Title color='primary'>
              {title}
            </Title>
          </TitleContainer>
        </PostMetaData>
        <SubHeader>
          <PostContext
            profAddress={post.user.address}
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
      <PostContent id='blog-text'>
        {
          htmlparse(postText)
        }
      </PostContent>
    </PostContainer>
  )
}

export default Post

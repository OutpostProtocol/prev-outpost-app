import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'
import {
  gql,
  useMutation
} from '@apollo/client'

import Share from '../Share'
import PendingChip from '../PendingChip'
import PostContext from '../PostContext'
import LoadingBackdrop from '../LoadingBackdrop'
import Comments from '../Comments'
import { deletePost } from '../../uploaders/blog-post'
import { GET_POSTS } from '../../hooks/usePosts'

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

const ChipContainer = styled('div')({
  'margin-top': '0.45em'
})

const CommentsContainer = styled(Comments)({
  'margin-top': '10px'
})

const pendingDescription = 'The post has been sent to the network but has not yet been confirmed.'
const DELETE_POST = gql`
    mutation deletePost($txId: String!) {
      deletePost(txId: $txId)
    }
  `

const Post = ({ post }) => {
  const { title, subtitle, postText, user, transaction, community, comments } = post
  const [isDeleting, setIsDeleting] = useState(false)
  const did = useSelector(state => state.did)
  const [deletePostFromDb] = useMutation(DELETE_POST)

  const isAuthor = () => {
    if (!user || !user.did) return false
    return post.user.did === did
  }

  const handleEdit = () => {
    navigate('/editor', { state: { post } })
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const res = await deletePost(transaction.txId, community.txId)
    if (res.status === 200 && res.data.status === 200) {
      await deletePostFromDb({
        variables: {
          txId: transaction.txId
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
            <ChipContainer>
              <PendingChip
                isPending={!post.transaction.blockHash}
                description={pendingDescription}
              />
            </ChipContainer>
          </TitleContainer>
        </PostMetaData>
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
            .use(parse, { commonmark: true })
            .use(remark2react)
            .processSync(postText).result
        }
      </PostContent>
      <hr />
      <CommentsContainer
        comments={comments}
        community={post.community}
        postTxId={transaction.txId}
      />
    </PostContainer>
  )
}

export default Post

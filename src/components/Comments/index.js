import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/styles'
import {
  TextField,
  Button
} from '@material-ui/core'
import {
  gql, useMutation
} from '@apollo/client'
import { decodeJWT } from 'did-jwt'

import { GET_POST } from '../../hooks/usePosts'
import LoadingBackdrop from '../LoadingBackdrop'
import Comment from './comment'
import { uploadComment } from '../../uploaders/blog-post'

const NewComment = styled(TextField)({
  width: '100%'
})

const PostComment = styled(Button)({
  float: 'right',
  'margin-top': '10px'
})

const CommentsContainer = styled('div')({
  'margin-top': '70px'
})

const CommentContainer = styled('div')({
  'margin-top': '20px'
})

const UPLOAD_COMMENT = gql`
  mutation uploadComment($comment: CommentUpload!) {
    uploadComment(comment: $comment) {
      postText
      timestamp
      user {
        did
      }
    }
  }
`

const Comments = ({ comments, community, postTxId }) => {
  const [newComment, setNewComment] = useState('')
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [uploadCommentToDb] = useMutation(UPLOAD_COMMENT)
  const [isUploadLoading, setIsLoading] = useState(false)

  comments = comments || []

  const handleNewComment = (event) => {
    if (event && event.target) {
      setNewComment(event.target.value)
    }
  }

  const handlePostComment = async () => {
    setIsLoading(true)

    const payload = {
      postText: newComment,
      postTxId: postTxId
    }
    const res = await uploadComment(payload, community.txId)
    if (res.status === 200 && res.data.status === 200) {
      await handleUploadToDb(res.data.tx)
    } else {
      alert('The comment upload failed. Try again')
    }
    setIsLoading(false)
    setNewComment('')
  }

  const handleUploadToDb = async (postTx) => {
    const rawData = postTx.data
    const jwt = Buffer.from(rawData, 'base64').toString('utf-8')

    const payload = decodeJWT(jwt).payload

    const { iss, iat, commentData } = payload

    const commentUpload = {
      userDid: iss,
      timestamp: iat,
      postText: commentData.postText,
      postTxId: postTxId,
      txId: postTx.id
    }

    const options = {
      variables: {
        comment: commentUpload
      },
      refetchQueries: [{
        query: GET_POST,
        variables: { txId: postTxId }
      }]
    }

    await uploadCommentToDb(options)

    setIsLoading(false)
  }

  return (
    <>
      <LoadingBackdrop isLoading={isUploadLoading} />
      { isLoggedIn &&
        <>
          <NewComment
            variant='outlined'
            placeholder='Comment'
            value={newComment}
            onChange={handleNewComment}
          />
          <PostComment
            disableElevation
            color='primary'
            variant='contained'
            onClick={handlePostComment}
          >
            COMMENT
          </PostComment>
        </>
      }
      <CommentsContainer>
        { comments.map(comment =>
          <CommentContainer>
            <Comment
              comment={comment}
              community={community}
            />
          </ CommentContainer>
        )
        }
      </CommentsContainer>
    </>
  )
}

export default Comments

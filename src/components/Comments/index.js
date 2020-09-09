import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/styles'
import { Button } from '@material-ui/core'
import {
  gql, useMutation
} from '@apollo/client'
import { decodeJWT } from 'did-jwt'
import Editor from 'rich-markdown-editor'

import { GET_POST } from '../../hooks/usePosts'
import LoadingBackdrop from '../LoadingBackdrop'
import Comment from './comment'
import { uploadComment } from '../../uploaders/blog-post'

const PostComment = styled(Button)({
  float: 'right',
  'margin-top': '10px'
})

const CommentsContainer = styled('div')({
  'margin-top': '30px',
  'margin-bottom': '50px'
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

  const handlePostComment = async () => {
    if (!newComment || newComment === '') {
      alert('You can\'t post an empty comment!')
      return
    }
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
      <CommentsContainer>
        { comments.map((comment, i) =>
          <CommentContainer key={i} >
            <Comment
              comment={comment}
            />
          </ CommentContainer>
        )
        }
      </CommentsContainer>
      { isLoggedIn &&
        <>
          <Editor
            headingsOffset={1}
            placeholder='COMMENT'
            defaultValue={newComment}
            onSave={options => console.log('Save triggered', options)}
            onCancel={() => console.log('Cancel triggered')}
            onShowToast={message => { if (typeof window !== 'undefined') window.alert(message) }}
            onChange={(value) => setNewComment(value)}
            uploadImage={file => {
              console.log('File upload triggered: ', file)
            }}
            autoFocus
          />
          <PostComment
            disableElevation
            color='secondary'
            variant='contained'
            onClick={handlePostComment}
          >
            POST
          </PostComment>
        </>
      }
    </>
  )
}

export default Comments

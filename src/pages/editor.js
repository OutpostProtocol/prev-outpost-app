import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {
  IconButton,
  Input,
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import Editor from 'rich-markdown-editor'
import {
  gql, useMutation
} from '@apollo/client'
import { decodeJWT } from 'did-jwt'

import { uploadPost } from '../uploaders'
import SEO from '../components/seo'
import CommunitySelector from '../components/CommunitySelector'
import { PLACEHOLDER_COMMUNITY } from '../constants'

const EditorContainer = styled('div')({
  width: '50vw',
  margin: '0 auto'
})

const PostButton = styled(Button)({
  float: 'right',
  'margin-top': '5px'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  'z-index': 2
})

const FormTextField = styled(Input)({
  width: '100%',
  'border-radius': '4px',
  margin: '2vh 0'
})

const TitleContainer = styled('div')({
  padding: '5vh 0 0 0'
})

const PostContent = styled(Editor)({
  'margin-top': '30px'
})

const OptionContainer = styled('div')({
  margin: '10vh 0',
  height: '3em'
})

const LoadingContainer = styled(Backdrop)({
  'z-index': 1200
})

const UPLOAD_POST = gql`
  mutation UploadPost($post: PostUpload!) {
    uploadPost(post: $post) {
      success,
      post {
        title
        postText
        subtitle
        timestamp
        community {
          name
        }
        user {
          did
        }
        transaction {
          txId
        }
      }
    }
  }
`

const EditorPage = () => {
  const [postText, setPostText] = useState('')
  const [communityId, setCommunityId] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [isWaitingForUpload, setIsWaiting] = useState(false)
  const [uploadPostToDb] = useMutation(UPLOAD_POST)

  const handleCommunitySelection = (event) => {
    if (event && event.target.value) {
      setCommunityId(event.target.value.txId)
    }
  }

  const handleUploadToDb = async (postTx) => {
    const rawData = postTx.data
    const jwt = Buffer.from(rawData, 'base64').toString('utf-8')

    const payload = decodeJWT(jwt).payload

    const { communityTxId, iss, iat, postData } = payload

    const postUpload = {
      communityTxId,
      userDid: iss,
      timestamp: iat,
      title: postData.title,
      subtitle: postData.subtitle,
      postText: postData.postText,
      txId: postTx.id
    }

    const res = await uploadPostToDb({
      variables: {
        post: postUpload
      }
    })

    const post = res.data.uploadPost.post

    setIsWaiting(false)

    navigate(`/post/${post.transaction.txId}`, { state: { post } })
  }

  const handlePost = async () => {
    if (postText === '') {
      alert('This post has no text.')
      return
    } else if (title === '') {
      alert('You must create a title for your post')
      return
    } else if (communityId === '' || communityId === PLACEHOLDER_COMMUNITY.txId) {
      alert('Select a community')
      return
    }

    setIsWaiting(true)

    // No subtitle is ok, the post preview will render a portion of the post instead
    const payload = {
      title: title,
      subtitle: subtitle !== '' ? subtitle : undefined,
      postText: postText
    }
    const res = await uploadPost(payload, communityId)

    if (res.status === 200 && res.data.status === 200) {
      return await handleUploadToDb(res.data.tx)
    }

    setIsWaiting(false)
    alert('The post upload failed. Try again.')
  }

  return (
    <>
      <SEO
        title="Post Editor"
      />
      <LoadingContainer
        open={isWaitingForUpload}
      >
        <CircularProgress
          disableShrink
        />
      </LoadingContainer>
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </BackButton>
      <EditorContainer>
        <TitleContainer>
          <FormTextField
            onChange={(event) => setTitle(event.target.value)}
            value={title}
            placeholder='TITLE'
          />
          <FormTextField
            onChange={(event) => setSubtitle(event.target.value)}
            value={subtitle}
            placeholder='DESCRIPTION (optional)'
          />
        </TitleContainer>
        <PostContent
          headingsOffset={1}
          placeholder='Begin writing your post'
          onSave={options => console.log('Save triggered', options)}
          onCancel={() => console.log('Cancel triggered')}
          onShowToast={message => window.alert(message)}
          onChange={(value) => setPostText(value)}
          uploadImage={file => {
            console.log('File upload triggered: ', file)
          }}
          autoFocus
        />
        <OptionContainer >
          <CommunitySelector
            handleSelection={handleCommunitySelection}
            placeHolder={PLACEHOLDER_COMMUNITY}
          />
          <PostButton
            disableElevation
            variant='contained'
            color='secondary'
            onClick={handlePost}
          >
          Post
          </PostButton>
        </OptionContainer>
      </EditorContainer>
    </>
  )
}

export default EditorPage

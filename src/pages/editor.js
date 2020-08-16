import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {
  IconButton,
  Input,
  Button
} from '@material-ui/core'
import Editor from 'rich-markdown-editor'
import {
  gql, useMutation
} from '@apollo/client'
import { decodeJWT } from 'did-jwt'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

import { uploadPost } from '../uploaders'
import LoadingBackdrop from '../components/LoadingBackdrop'
import SEO from '../components/seo'
import CommunitySelector from '../components/CommunitySelector'
import { PLACEHOLDER_COMMUNITY } from '../constants'

const EditorContainer = styled('div')({
  width: '50vw',
  margin: '0 auto 10vh'
})

const PostButton = styled(Button)({
  float: 'right',
  margin: '5px 0 0 5px'
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
  padding: '7vh 0 0 0'
})

const PostContent = styled(Editor)({
  'margin-top': '30px'
})

const OptionContainer = styled('div')({
  'margin-top': '10vh',
  height: '3em'
})

const WarningText = styled('div')({
  color: '#FF5252'
})

const UPLOAD_POST = gql`
  mutation UploadPost($post: PostUpload!) {
    uploadPost(post: $post) {
      success
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
  const [showPreview, setShowPreview] = useState(false)
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

    console.log(payload, 'THE UPLOAD PAYLOAD')
    /*
    const res = await uploadPost(payload, communityId)

    if (res.status === 200 && res.data.status === 200) {
      return await handleUploadToDb(res.data.tx)
    }
    */

    setIsWaiting(false)
    alert('The post upload failed. Try again.')
  }

  return (
    <>
      <SEO
        title="Post Editor"
      />
      <LoadingBackdrop isLoading={isWaitingForUpload} />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </BackButton>
      <EditorContainer>
        {showPreview
          ? <PostPreview
            title={title}
            subtitle={subtitle}
            postText={postText}
          />
          : <FullEditor
            title={title}
            subtitle={subtitle}
            postText={postText}
            setTitle={setTitle}
            setSubtitle={setSubtitle}
            setPostText={setPostText}
          />
        }
        <OptionContainer >
          <CommunitySelector
            handleSelection={handleCommunitySelection}
            placeHolder={PLACEHOLDER_COMMUNITY}
          />
          <PostActions
            setShowPreview={setShowPreview}
            showPreview={showPreview}
            handlePost={handlePost}
          />
        </OptionContainer>
        {showPreview
          ? <WarningText>
              WARNING: All posts are uploaded to a public blockchain.
          </WarningText>
          : null
        }
      </EditorContainer>
    </>
  )
}

const PostActions = ({ showPreview, setShowPreview, handlePost }) => {
  if (showPreview) {
    return (
      <>
        <PostButton
          disableElevation
          variant='contained'
          color='secondary'
          onClick={() => setShowPreview(false)}
        >
          EDIT
        </PostButton>
        <PostButton
          disableElevation
          variant='contained'
          color='secondary'
          onClick={handlePost}
        >
        POST
        </PostButton>
      </>
    )
  }

  return (
    <PostButton
      disableElevation
      variant='contained'
      color='secondary'
      onClick={() => setShowPreview(true)}
    >
      PREVIEW
    </PostButton>
  )
}

const PostHeader = styled('div')({
  height: '100%',
  'align-items': 'center'
})

const Title = styled('h1')({
  margin: '5vh 0'
})

const PreviewContainer = styled('div')({
  'padding-top': '7vh'
})

const Subtitle = styled('h4')({
  'margin-bottom': '5vh'
})

const PostPreview = ({ title, subtitle, postText }) => {
  return (
    <PreviewContainer>
      <PostHeader>
        <Title color='primary'>
          {title}
        </Title>
        <Subtitle>
          {subtitle}
        </Subtitle>
      </PostHeader>
      <div>
        {
          unified()
            .use(parse)
            .use(remark2react)
            .processSync(postText).result
        }
      </div>
    </PreviewContainer>
  )
}

const FullEditor = ({ title, subtitle, postText, setTitle, setSubtitle, setPostText }) => {
  console.log('SHOWING FULL EDITOR')
  return (
    <>
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
        defaultValue={postText}
        onSave={options => console.log('Save triggered', options)}
        onCancel={() => console.log('Cancel triggered')}
        onShowToast={message => { if (typeof window !== 'undefined') window.alert(message) }}
        onChange={(value) => setPostText(value)}
        uploadImage={file => {
          console.log('File upload triggered: ', file)
        }}
        autoFocus
      />
    </>
  )
}

export default EditorPage

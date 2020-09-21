import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { IconButton } from '@material-ui/core'
import {
  gql,
  useMutation
} from '@apollo/client'

import { uploadPost } from '../uploaders'
import { GET_POSTS } from '../hooks/usePosts'
import { isValidURL } from '../utils'
import LoadingBackdrop from '../components/LoadingBackdrop'
import SEO from '../components/seo'
import CommunitySelector from '../components/CommunitySelector'
import {
  PLACEHOLDER_COMMUNITY,
  EMPTY_POST,
  ERROR_TYPES
} from '../constants'
import PostActions from '../components/Editor/PostActions'
import ContentEditor from '../components/Editor/ContentEditor'
import EditorPreview from '../components/Editor/EditorPreview'
import CanonicalLinkOption from '../components/Editor/CanonicalLinkOption'
import { useErrorReporting } from '../hooks'

const EditorContainer = styled('div')({
  width: '50vw',
  margin: '0 auto 10vh'
})

const BackButton = styled(IconButton)({
  margin: '5px',
  position: 'absolute',
  'z-index': 2
})

const PreviewContainer = styled('div')({
  height: '3em',
  'margin-top': '30px'
})

const WarningText = styled('div')({
  color: '#FF5252'
})

const UPLOAD_POST = gql`
  mutation UploadPost($id: String, $post: PostUpload!) {
    uploadPost(id: $id, post: $post) {
      txId
      id
      title
      postText
      subtitle
      timestamp
      canonicalLink
      community {
        name
      }
      user {
        did
      }
    }
  }
`

const EditorPage = ({ location }) => {
  const isEditingMode = location.state && location.state.post
  const postTemplate = isEditingMode ? location.state.post : EMPTY_POST
  const placeholderCommunity = (isEditingMode && location.state.post.community) ? location.state.post.community : PLACEHOLDER_COMMUNITY

  const [postText, setPostText] = useState(postTemplate.postText)
  const [communityId, setCommunityId] = useState(placeholderCommunity.txId)
  const [title, setTitle] = useState(postTemplate.title)
  const [subtitle, setSubtitle] = useState(postTemplate.subtitle)
  const [isWaitingForUpload, setIsWaiting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [hasCanonicalLink, setHasLink] = useState(false)
  const [canonicalLink, setCanonicalLink] = useState('')
  const [uploadPostToDb, { error }] = useMutation(UPLOAD_POST)
  useErrorReporting(ERROR_TYPES.mutation, error, 'UPLOAD_POST')

  const handleCommunitySelection = (event) => {
    if (event && event.target.value) {
      setCommunityId(event.target.value.txId)
    }
  }

  const handleUploadToDb = async (txInfo) => {
    const { communityTxId, author, time, postData, txId, featuredImg } = txInfo

    const postUpload = {
      communityTxId,
      userDid: author,
      timestamp: time,
      title: postData.title,
      subtitle: postData.subtitle,
      postText: postData.postText,
      txId,
      featuredImg,
      canonicalLink: postData.canonicalLink,
      parentTxId: postTemplate.txId
    }

    // if the user is editing, include the id to update the cache
    let options
    if (isEditingMode) {
      options = {
        variables: {
          post: postUpload,
          id: postTemplate.id
        },
        refetchQueries: [{ query: GET_POSTS }]
      }
    } else {
      options = {
        variables: {
          post: postUpload
        },
        refetchQueries: [{ query: GET_POSTS }]
      }
    }

    const res = await uploadPostToDb(options)

    if (isEditingMode) {
      navigate(`/post/${postTemplate.transaction.txId}`)
    } else {
      navigate(`/post/${res.data.uploadPost.txId}`)
    }
  }

  const handlePost = async () => {
    if (postText === '') {
      alert('This post has no text.')
      return
    } else if (title === '') {
      alert('You must create a title for your post')
      return
    } else if (hasCanonicalLink && !isValidURL(canonicalLink)) {
      alert('Either disable the canonical link or enter a valid URL [https://www.example.com]')
      return
    } else if (communityId === '' || communityId === PLACEHOLDER_COMMUNITY.txId) {
      alert('Select a community')
      return
    } else if (subtitle === '') {
      alert('This post has no subtitle')
      return
    }
    setIsWaiting(true)

    // No subtitle is ok, the post preview will render a portion of the post instead
    const payload = {
      title: title,
      subtitle: subtitle,
      postText: postText,
      canonicalLink: canonicalLink,
      parentTxId: postTemplate.transaction.txId
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
          ? <EditorPreview
            title={title}
            subtitle={subtitle}
            postText={postText}
          />
          : <ContentEditor
            title={title}
            subtitle={subtitle}
            postText={postText}
            setTitle={setTitle}
            setSubtitle={setSubtitle}
            setPostText={setPostText}
            isEditing={isEditingMode}
          />
        }
        <PreviewContainer>
          <CommunitySelector
            handleSelection={handleCommunitySelection}
            placeHolder={placeholderCommunity}
            disabled={isEditingMode}
          />
          <PostActions
            setShowPreview={setShowPreview}
            showPreview={showPreview}
            handlePost={handlePost}
          />
        </PreviewContainer>
        {showPreview
          ? <WarningText>
              WARNING: All posts are permanently added to a public blockchain.
          </WarningText>
          : null
        }
        <CanonicalLinkOption
          hasCanonicalLink={hasCanonicalLink}
          setHasLink={setHasLink}
          canonicalLink={canonicalLink}
          setCanonicalLink={setCanonicalLink}
        />
      </EditorContainer>
    </>
  )
}

export default EditorPage

import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {
  IconButton,
  TextField,
  Button
} from '@material-ui/core'
import Editor from 'rich-markdown-editor'

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

const FormTextField = styled(TextField)({
  width: '100%',
  'border-radius': '4px',
  'margin-top': '15px'
})

const PostContent = styled(Editor)({
  margin: '10px 0px',
  border: '1px solid #c4c4c4',
  padding: '10px',
  'border-radius': '4px',
  '&:hover': {
    border: '1px solid #000000'
  }
})

const EditorPage = () => {
  const [postText, setPostText] = useState('')
  const [communityAddress, setCommunityAddress] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  const handleCommunitySelection = (event) => {
    if (event && event.target.value) {
      setCommunityAddress(event.target.value.address)
    }
  }

  const handlePost = async () => {
    if (postText === '') {
      alert('this post has no text')
      return
    } else if (communityAddress === '' || communityAddress === PLACEHOLDER_COMMUNITY.address) {
      alert('select a community')
      return
    }

    // No subtitle is ok, the post preview will render a portion of the post instead
    const payload = {
      title: title !== '' ? title : 'Untitled',
      subtitle: subtitle !== '' ? subtitle : undefined,
      postText: postText
    }
    const thread = await window.space.joinThreadByAddress(communityAddress)
    await thread.post(payload)
    navigate('/')
  }

  return (
    <>
      <SEO
        title="Post Editor"
      />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </BackButton>
      <EditorContainer>
        <FormTextField
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          label='Title'
          variant='outlined'
        >
        </FormTextField>
        <FormTextField
          onChange={(event) => setSubtitle(event.target.value)}
          value={subtitle}
          label='Subtitle'
          variant='outlined'
        >
        </FormTextField>
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
      </EditorContainer>
    </>
  )
}

export default EditorPage

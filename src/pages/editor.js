import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import {
  IconButton,
  Button
} from '@material-ui/core'

import SEO from '../components/seo'
import Editor from 'rich-markdown-editor'
import CommunitySelector from '../components/NewPost/CommunitySelector'
import { PLACEHOLDER_COMMUNITY } from '../constants'

const EditorContainer = styled('div')({
  width: '50vw',
  margin: '0 auto'
})

const TextContainer = styled('div')({
  'border-radius': '4px',
  'border-color': 'black'
})

const PostButton = styled(Button)({
  float: 'right',
  'margin-top': '5px'
})

const EditorPage = () => {
  return (
    <>
      <SEO title="Post Editor" />
      <IconButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </IconButton>
      <EditorContainer>
        <TextContainer>
          <Editor
            placeholder='enter post text here'
            onSave={options => console.log('Save triggered', options)}
            onCancel={() => console.log('Cancel triggered')}
            onShowToast={message => window.alert(message)}
            uploadImage={file => {
              console.log('File upload triggered: ', file)
            }}
            autoFocus
          />
        </TextContainer>
        <CommunitySelector
          handleSelection={null}
          placeHolder={PLACEHOLDER_COMMUNITY}
        />
        <PostButton
          disableElevation
          variant='contained'
          onClick={null}
        >
          Post
        </PostButton>
      </EditorContainer>
    </>
  )
}

export default EditorPage

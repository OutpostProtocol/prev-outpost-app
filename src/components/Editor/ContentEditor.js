import React from 'react'
import { styled } from '@material-ui/core/styles'
import Editor from 'rich-markdown-editor'
import { Input } from '@material-ui/core'

const FormTextField = styled(Input)({
  width: '100%',
  'border-radius': '4px',
  margin: '2vh 0'
})

const TitleContainer = styled('div')({
  padding: '7vh 0 0 0',
  'text-align': 'center'
})

const PostContent = styled(Editor)({
  'margin-top': '30px'
})

const ContentEditor = ({ title, subtitle, postText, setTitle, setSubtitle, setPostText, isEditing }) => {
  return (
    <>
      <TitleContainer>
        { isEditing &&
          <h3>
            Edit Post
          </h3>
        }
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

export default ContentEditor

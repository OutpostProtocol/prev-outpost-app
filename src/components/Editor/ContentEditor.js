import React from 'react'
import { styled } from '@material-ui/core/styles'
import Editor from 'rich-markdown-editor'
import { Input } from '@material-ui/core'

import { uploadImage } from '../../uploaders'

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
  if (!subtitle) subtitle = ''

  const imageUpload = async (photoFile) => {
    const form = new window.FormData()

    form.append('image', photoFile)

    const res = await uploadImage(form)

    return `https://arweave.net/${res.data.txId}`
  }

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
          placeholder='SUBTITLE (optional)'
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
        uploadImage={async file => await imageUpload(file)}
        autoFocus
      />
    </>
  )
}

export default ContentEditor

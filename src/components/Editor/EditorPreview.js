import React from 'react'
import { styled } from '@material-ui/core/styles'
import htmlparse from 'html-react-parser'
import 'react-quill/dist/quill.bubble.css'

const PostHeader = styled('div')({
  height: '100%',
  'align-items': 'center'
})

const Title = styled('h1')({
  margin: '5vh 0',
  'font-size': '40px'
})

const PreviewContainer = styled('div')({
  'padding-top': '7vh'
})

const Subtitle = styled('h4')({
  'margin-bottom': '5vh',
  'font-size': '20px'
})

const EditorPreview = ({ title, subtitle, postText }) => {
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
      <div id='blog-text'>
        {
          htmlparse(postText)
        }
      </div>
    </PreviewContainer>
  )
}

export default EditorPreview

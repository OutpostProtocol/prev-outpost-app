import React from 'react'
import { styled } from '@material-ui/core/styles'
import showdown from 'showdown'
import htmlparse from 'html-react-parser'

const converter = new showdown.Converter()

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

const EditorPreview = ({ title, subtitle, postText }) => {
  const displayText = converter.makeHtml(postText.replace(/\\/g, '<br/>'))

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
          htmlparse(displayText)
        }
      </div>
    </PreviewContainer>
  )
}

export default EditorPreview

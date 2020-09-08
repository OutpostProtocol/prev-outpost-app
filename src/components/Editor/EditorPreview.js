import React from 'react'
import { styled } from '@material-ui/core/styles'
import unified from 'unified'
import parse from 'remark-parse'
import remark2react from 'remark-react'

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
            .use(parse, { commonmark: true })
            .use(remark2react)
            .processSync(postText).result
        }
      </div>
    </PreviewContainer>
  )
}

export default EditorPreview

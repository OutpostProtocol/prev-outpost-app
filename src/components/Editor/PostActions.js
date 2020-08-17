import React from 'react'
import { Button } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const PostButton = styled(Button)({
  margin: '5px 0 0 5px'
})

const PostButtonContainer = styled('div')({
  float: 'right'
})

const PostActions = ({ showPreview, setShowPreview, handlePost }) => {
  if (showPreview) {
    return (
      <PostButtonContainer>
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
      </PostButtonContainer>
    )
  }

  return (
    <PostButtonContainer>
      <PostButton
        disableElevation
        variant='contained'
        color='secondary'
        onClick={() => setShowPreview(true)}
      >
      PREVIEW
      </PostButton>
    </PostButtonContainer>
  )
}

export default PostActions

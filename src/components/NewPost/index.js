import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core'

import CommunitySelector from './CommunitySelector'
import { PLACEHOLDER_COMMUNITY } from '../../constants'

const NewPostContainer = styled('div')({
  margin: '0 0 3% 0'
})

const ToolbarContainer = styled('div')({
  'text-align': 'right'
})

const ToolbarButton = styled(Button)({
  margin: '5px',
  display: 'inline-block',
  'vertical-align': 'middle'
})

const PostText = styled(TextField)({
  width: '100%'
})

const PostCapacity = styled(CircularProgress)({
  display: 'inline-block',
  'margin-right': '5px',
  'vertical-align': 'middle'
})

const NewPost = () => {
  const [postText, setPostText] = useState('')
  const [communityAddress, setCommunityAddress] = useState('')
  const MAX_ROWS = 3
  const MAX_LENGTH = 200

  const handleChange = (event) => {
    setPostText(event.target.value)
  }

  const handleCommunitySelection = (event) => {
    if (event && event.target.value) {
      setCommunityAddress(event.target.value.address)
    }
  }

  const handlePost = async () => {
    if (postText === 'undefined' || postText === '') {
      alert('enter something!')
      return
    } else if (communityAddress === PLACEHOLDER_COMMUNITY.address) {
      alert('select a community!')
      return
    }
    const thread = await window.space.joinThreadByAddress(communityAddress)
    await thread.post(postText)
    setPostText('')
  }

  const getRemainingCapacity = () => {
    return (postText.length / MAX_LENGTH) * 100
  }

  const handleOpenEditor = () => {
    navigate('/editor')
  }

  return (
    <NewPostContainer>
      <PostText
        label='Post text'
        variant='outlined'
        multiline
        rows={MAX_ROWS}
        inputProps={{ maxLength: MAX_LENGTH }}
        value={postText}
        onChange={handleChange}
      />
      <CommunitySelector
        handleSelection={handleCommunitySelection}
        placeHolder={PLACEHOLDER_COMMUNITY}
      />
      <ToolbarContainer>
        <PostCapacity
          variant="static"
          value={getRemainingCapacity()}
        />
        <ToolbarButton
          disableElevation
          variant= 'contained'
          onClick={handleOpenEditor}
        >
          Open Rich Text Editor
        </ToolbarButton>
        <ToolbarButton
          disableElevation
          variant= 'contained'
          onClick={handlePost}
        >
          Post
        </ToolbarButton>
      </ToolbarContainer>
    </NewPostContainer>
  )
}

export default NewPost

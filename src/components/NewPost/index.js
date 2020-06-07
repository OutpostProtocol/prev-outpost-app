import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CommunitySelector from './CommunitySelector'

const NewPostContainer = styled('div')({
  margin: '0 0 3% 0'
})

const PostButton = styled(Button)({
  margin: '5px',
  float: 'right',
  'margin-right': 0
})

const PostText = styled(TextField)({
  width: '100%'
})

const placeHolderCommunity = {
  name: 'Community',
  address: 'PLACEHOLDER'
}

const NewPost = () => {
  const [postText, setPostText] = useState('')
  const [communityAddress, setCommunityAddress] = useState('')

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
    } else if (communityAddress === placeHolderCommunity.address) {
      alert('select a community!')
      return
    }
    const thread = await window.space.joinThreadByAddress(communityAddress)
    await thread.post(postText)
    setPostText('')
  }

  return (
    <NewPostContainer>
      <PostText
        label='Post text'
        variant='outlined'
        value={postText}
        onChange={handleChange}
      />
      <CommunitySelector
        handleSelection={handleCommunitySelection}
        placeHolder={placeHolderCommunity}
      >
      </CommunitySelector>
      <PostButton
        disableElevation
        variant= 'contained'
        onClick={handlePost}
      >
        Post
      </PostButton>
    </NewPostContainer>
  )
}

export default NewPost

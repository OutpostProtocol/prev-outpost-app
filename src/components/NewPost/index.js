import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CommunitySelector from './CommunitySelector'
import styles from './index.module.css'

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
    } else if (communityAddress === '') {
      alert('select a community!')
      return
    }
    const thread = await window.space.joinThreadByAddress(communityAddress)
    await thread.post(postText)
    setPostText('')
  }

  return (
    <div className={styles.container}>
      <TextField
        value={postText}
        onChange={handleChange}
        multiline
        label='Post text'
        variant='outlined'
        className={styles.textField}
      />
      To <CommunitySelector
        handleSelection={handleCommunitySelection}
      >
      </CommunitySelector>
      <Button
        variant='contained'
        disableElevation
        onClick={handlePost}
        className={styles.postBtn}
      >
        Post
      </Button>
    </div>
  )
}

export default NewPost

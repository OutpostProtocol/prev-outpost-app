import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CommunitySelector from '../CommunitySelector'

import styles from './index.module.css'

const NewPost = ({ thread }) => {
  const [postText, setPostText] = useState('')

  const handleChange = (event) => {
    setPostText(event.target.value)
  }

  const handlePost = async () => {
    if (postText === 'undefined' || postText === '') {
      alert('enter something!')
    }

    await thread.post(postText)
  }

  return (
    <div className={styles.container}>
      <TextField
        value={postText}
        onChange={handleChange}
        multiline
        label='What is on your mind?'
        variant='outlined'
        className={styles.textField}
      />
      <CommunitySelector>
      </CommunitySelector>
      <Button
        variant='contained'
        onClick={handlePost}
        className={styles.postBtn}
      >
        Post
      </Button>
    </div>
  )
}

export default NewPost

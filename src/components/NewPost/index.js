import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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

    console.log(thread, 'THE TREAD')

    await thread.post(postText)
    console.log('THE THREAD WAS POSTED')
  }

  return (
    <div className={styles.container}>
      <TextField
        value={postText}
        onChange={handleChange}
        multiline
        label='Post'
        variant='outlined'
        className={styles.textField}
      />
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

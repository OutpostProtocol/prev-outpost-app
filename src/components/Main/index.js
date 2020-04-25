import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import Feed from '../Feed'
import NewPost from '../NewPost'

import styles from './index.module.css'

const Main = ({ address }) => {
  const [posts, setPosts] = useState(0)
  const [thread, setThread] = useState(0)

  const createThread = async () => {
    if (!address) {
      alert('You must sign in to create a thread')
      return
    }

    const curThread = await window.space.joinThread('rainThread', {
      firstModerator: address,
      members: true
    })
    setOnUpdate(curThread)

    const curPosts = await curThread.getPosts()
    setThread(curThread)
    setPosts(curPosts)
  }

  const setOnUpdate = (curThread) => {
    curThread.onUpdate(() => console.log('THREAD UPDATED'))
  }

  return (
    <div className={styles.container}>
      <Button
        variant='contained'
        color='primary'
        onClick={createThread}
      >
        Create Thread
      </Button>
      <NewPost
        thread={thread}
      />
      <Feed
        posts={posts}
      />
    </div>
  )
}

export default Main

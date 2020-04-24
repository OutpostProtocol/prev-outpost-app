import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import Feed from '../Feed'
import NewPost from '../NewPost'

import styles from './index.module.css'

const Main = ({ address, space }) => {
  const [posts, setPosts] = useState(0)
  const [thread, setThread] = useState(0)

  const createThread = async () => {
    if (!address) {
      alert('You must sign in to create a thread')
      return
    }

    console.log(space, 'SPACE BEFORE TRYING TO JOIN')

    const curThread = await space.joinThread('rainThread', {
      firstModerator: address,
      members: true
    })
    setThread(curThread)
    setOnUpdate()

    const curPosts = await thread.getPosts()
    setPosts(curPosts)
  }

  const setOnUpdate = () => {
    thread.onUpdate(() => console.log('THREAD UPDATED'))
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

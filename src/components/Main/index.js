import React, { useState } from 'react'
import Button from '@material-ui/core/Button'

import Feed from '../Feed'
import NewPost from '../NewPost'

import styles from './index.module.css'

const Main = ({ address, space }) => {
  const [posts, setPosts] = useState(0)
  const [thread, setThread] = useState(0)

  const createThread = async () => {
    if (!space) {
      alert('You need to authorize spaces!')
      return
    }

    const curThread = await space.joinThread('myThread', {
      firstModerator: address,
      members: true
    })
    setThread(curThread)

    const curPosts = await thread.getPosts()
    setPosts(curPosts)
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

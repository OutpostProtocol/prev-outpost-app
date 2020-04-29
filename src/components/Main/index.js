import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'

import Feed from '../Feed'
import NewPost from '../NewPost'

import styles from './index.module.css'

const Main = ({ address }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [posts, setPosts] = useState([])
  const [thread, setThread] = useState({})

  const createThread = async () => {
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
    curThread.onUpdate(async () => {
      const curPosts = await curThread.getPosts()
      setPosts(curPosts)
    })
  }

  return (
    <div className={styles.container}>
      {isLoggedIn
        ? <Button
          variant='contained'
          color='primary'
          onClick={createThread}
        >
          Create Thread
        </Button>
        : null
      }

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

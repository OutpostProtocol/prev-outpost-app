import React from 'react'

import Post from '../Post'
import styles from './index.module.css'

const Feed = ({ posts }) => {
  if (posts) {
    return (
      <div className={styles.feedContainer}>
        {posts.map((post, i) => {
          return (
            <Post
              post={post}
              key={i}
            />
          )
        })
        }
      </div>
    )
  } else {
    return (
      <div />
    )
  }
}

export default Feed

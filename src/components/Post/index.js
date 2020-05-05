import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'

import styles from './index.module.css'

const Post = ({ post }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(post.timestamp).format(TIME_FORMAT)

  return (
    <div className={styles.post}>
      <div className={styles.postHeading}>
        <ProfileHover
          address={post.author}
          showName={true}
          orientation='left'>
        </ProfileHover>
        <span className={styles.timestamp}> {time} {post.threadName} </span>
      </div>
      <div className={styles.postContent}>{post.message}</div>
    </div>
  )
}

export default Post

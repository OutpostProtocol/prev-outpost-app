import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'

import styles from './index.module.css'

const Post = ({ author, message, timestamp }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(timestamp).format(TIME_FORMAT)

  return (
    <div className={styles.post}>
      <div className={styles.postHeading}>
        <ProfileHover
          address={author}
          showName={true}
          orientation='top'>
        </ProfileHover>
        <span className={styles.timestamp}> {time}</span>
      </div>
      <div className={styles.postContent}>{message}</div>
    </div>
  )
}

export default Post

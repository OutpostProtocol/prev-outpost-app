import React from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'
import { navigate } from 'gatsby'

import styles from './index.module.css'

const Post = ({ post }) => {
  const TIME_FORMAT = 'M/D h:mm a'
  const time = moment.unix(post.timestamp).format(TIME_FORMAT)

  return (
    <div
      onClick={() => navigate('/post', { state: { post } })}
      className={styles.post}>
      <div>
        <div className={styles.postHeading}>
          <span>
            <ProfileHover
              address={post.author}
              showName={true}
              orientation='left'>
            </ProfileHover>
          </span>
          <span className={styles.postMetaData}>{post.threadName} {time}</span>
          <span className={styles.postContent}>{post.message}</span>
        </div>
      </div>
    </div>
  )
}

export default Post

import React, { useState, useEffect } from 'react'
import moment from 'moment'
import ProfileHover from 'profile-hover'
import Box from '3box'

import styles from './index.module.css'

const TIME_FORMAT = 'M/D h:mm a'

const Post = ({ author, message, timestamp }) => {
  const [profile, setProfile] = useState({})
  const time = moment.unix(timestamp).format(TIME_FORMAT)

  useEffect(() => {
    const getProfile = async () => {
      const profile = await Box.getProfile(author)
      setProfile(profile)
    }

    if (!profile) getProfile()
  })

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

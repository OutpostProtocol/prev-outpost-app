import React from 'react'

import Feed from '../Feed'
import NewPost from '../NewPost'

import styles from './index.module.css'

const Main = ({ address }) => {
  return (
    <div className={styles.container}>
      <NewPost />
      <Feed />
    </div>
  )
}

export default Main

import React from 'react'
import { navigate } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import Post from '../components/Post'

import styles from './index.module.css'

const viewPost = ({ location }) => {
  if (!location.state.post) {
    navigate('/')
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </IconButton>
      <div className={styles.postContainer}>
        <Post
          post={location.state.post}
        />
      </div>
    </>
  )
}

export default viewPost

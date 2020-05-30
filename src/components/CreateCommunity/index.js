import React from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'

import styles from './index.module.css'

const CreateCommunity = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  if (isLoggedIn) {
    return (
      <Button
        onClick={() => navigate('/createCommunity')}
        variant='contained'
        color='primary'
        disableElevation
        classes={{
          root: styles.buttonRoot
        }}
      >
        Create a Community
      </Button>
    )
  } else {
    return null
  }
}

export default CreateCommunity

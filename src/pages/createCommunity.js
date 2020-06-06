import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import CreateCommunityForm from '../components/CreateCommunity/CreateCommunityForm'

const CreateCommunity = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  if (!isLoggedIn) {
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
      <CreateCommunityForm />
    </>
  )
}

export default CreateCommunity

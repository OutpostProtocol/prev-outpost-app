import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import CreateCommunityForm from '../components/CreateCommunity/CreateCommunityForm'
import SEO from '../components/seo'

const CreateCommunityPage = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  if (!isLoggedIn) {
    navigate('/')
  }

  return (
    <>
      <SEO title="Create a Community" />
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

export default CreateCommunityPage

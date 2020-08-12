import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import CreateCommunityForm from '../components/CreateCommunity/CreateCommunityForm'
import SEO from '../components/seo'

const BackButton = styled(IconButton)({
  margin: '5px'
})

const CreateCommunityPage = () => {
  return (
    <>
      <SEO title="Create a Community" />
      <BackButton
        color="inherit"
        aria-label="Go back"
        edge="end"
        onClick={() => navigate('/')}
      >
        <ChevronLeftIcon />
      </BackButton>
      <CreateCommunityForm />
    </>
  )
}

export default CreateCommunityPage

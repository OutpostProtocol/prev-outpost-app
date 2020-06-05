import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { navigate } from 'gatsby'

const CreateButton = styled(Button)({
  variant: 'contained',
  'border-radius': '4px',
  width: '80%',
  margin: '5px 10%'
})

const CreateCommunity = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  if (isLoggedIn) {
    return (
      <CreateButton
        disableElevation
        onClick={() => navigate('/createCommunity')}
      >
        Create a Community
      </CreateButton>
    )
  } else {
    return null
  }
}

export default CreateCommunity

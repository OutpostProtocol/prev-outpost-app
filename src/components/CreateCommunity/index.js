import React from 'react'
import { useSelector } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const CreateButton = styled(Button)({
  width: '80%',
  margin: '5px 10%',
  'border-radius': '4px'
})

const CreateCommunity = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  if (isLoggedIn) {
    return (
      <CreateButton
        variant='contained'
        color='primary'
        disabled={!isLoggedIn}
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

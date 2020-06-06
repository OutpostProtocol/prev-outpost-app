import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { ADD_COMMUNITY_ASYNC } from '../../redux/actionTypes'

const FormContainer = styled('div')({
  width: '25vw',
  margin: '0 auto',
  'text-align': 'center'
})

const FormTitle = styled('h2')({
  'text-align': 'center'
})

const FormTextField = styled(TextField)({
  width: '100%',
  'border-radius': '4px',
  'margin-top': '15px'
})

const FormButton = styled(Button)({
  width: '100%',
  color: 'primary',
  'border-radius': '4px',
  'margin-top': '15px'
})

const CreateCommunityForm = () => {
  const address = useSelector(state => state.address)
  const [name, setName] = useState('')
  const [abbr, setAbbr] = useState('')
  const dispatch = useDispatch()

  const createCommunity = async () => {
    const community = {
      name: name,
      abbr: abbr,
      moderatorAddress: address
    }
    if (validateFields()) {
      dispatch({ type: ADD_COMMUNITY_ASYNC, community })
      navigate('/')
    }
  }

  const validateFields = () => {
    if (abbr === '') {
      alert('enter an abbreviation')
      return false
    } else if (name === '') {
      alert('enter a name')
      return false
    } else if (address === '') {
      alert('address is undefined')
      return false
    }
    return true
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleAbbr = (event) => {
    const abbr = event.target.value
    if (abbr && abbr.length <= 3) {
      setAbbr(event.target.value)
    }
  }

  return (
    <FormContainer>
      <FormTitle>
        Create a Community
      </FormTitle>
      <FormTextField
        value={name}
        onChange={handleName}
        label='Community Name'
        variant='outlined'
      />
      <FormTextField
        value={abbr}
        onChange={handleAbbr}
        label='Community Abbreviation'
        variant='outlined'
      />
      <FormButton
        onClick={createCommunity}
        disableElevation
        color='primary'
        variant='contained'
      >
        Create
      </FormButton>
    </FormContainer>
  )
}

export default CreateCommunityForm

import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  Button,
  TextField
} from '@material-ui/core'

import { uploadNewCommunity } from '../../uploaders'

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
  const { account } = useWeb3React()
  const [name, setName] = useState('')

  const createCommunity = async () => {
    const community = {
      name,
      isOpen: true
    }

    if (hasValidFields()) {
      await uploadNewCommunity(community)
      navigate('/')
    }
  }

  const hasValidFields = () => {
    if (name === '') {
      alert('enter a name')
      return false
    } else if (account === '') {
      alert('user address is undefined')
      return false
    } else if (name.includes('/')) {
      alert('Illegal character \'/\'')
      return false
    }
    return true
  }

  const handleName = (event) => {
    setName(event.target.value)
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
      <FormButton
        onClick={createCommunity}
        disableElevation
        color='secondary'
        variant='contained'
      >
        Create
      </FormButton>
    </FormContainer>
  )
}

export default CreateCommunityForm

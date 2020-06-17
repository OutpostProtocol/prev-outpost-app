import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  Button,
  TextField,
  Checkbox
} from '@material-ui/core'

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

const FormCheckboxContainer = styled('div')({
  'margin-top': '15px',
  float: 'left'
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
  const [symbol, setSymbol] = useState('')
  const [isOpenToView, setIsOpenToView] = useState(false)
  const [isOpenToPost, setIsOpenToPost] = useState(false)
  const dispatch = useDispatch()

  const createCommunity = async () => {
    const community = {
      name,
      symbol,
      isOpenToView,
      isOpenToPost,
      moderatorAddress: account
    }

    if (validateFields()) {
      dispatch({ type: ADD_COMMUNITY_ASYNC, community })
      navigate('/')
    }
  }

  const validateFields = () => {
    if (symbol === '') {
      alert('enter an abbreviation')
      return false
    } else if (name === '') {
      alert('enter a name')
      return false
    } else if (account === '') {
      alert('user address is undefined')
      return false
    } else if (isOpenToPost && !isOpenToView) {
      alert('In order to allow public to post, please allow them to view the community')
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

  const handleSymbol = (event) => {
    const symbol = event.target.value
    if (symbol && symbol.length <= 3) {
      setSymbol(event.target.value)
    }
  }

  const handleIsOpenToView = (event) => {
    if (event && event.target.value !== undefined) {
      setIsOpenToView(event.target.value)
    }
  }

  const handleIsOpenToPost = (event) => {
    if (event && event.target.value !== undefined) {
      setIsOpenToPost(event.target.value)
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
        value={symbol}
        onChange={handleSymbol}
        label='Community Abbreviation'
        variant='outlined'
      />
      <FormCheckboxContainer>
        Can public view?
        <Checkbox
          value={isOpenToView}
          onClick={handleIsOpenToView}
          color='primary'
        />
      </FormCheckboxContainer>
      <FormCheckboxContainer>
        Can public post?
        <Checkbox
          disabled={!isOpenToView}
          value={isOpenToPost}
          onClick={handleIsOpenToPost}
          color='primary'
        />
      </FormCheckboxContainer>
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

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { ADD_COMMUNITY_ASYNC } from '../../redux/actionTypes'
import styles from './index.module.css'

const CreateForm = ({ handleClose }) => {
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
    if (validateFields) {
      dispatch({ type: ADD_COMMUNITY_ASYNC, community })
      handleClose()
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
    <div>
      <TextField
        value={name}
        onChange={handleName}
        label='Community Name'
        variant='outlined'
      />
      <TextField
        value={abbr}
        onChange={handleAbbr}
        label='Community Abbreviation'
        variant='outlined'
      />
      <Button
        onClick={createCommunity}
        disableElevation
        color='primary'
        classes={{
          root: styles.buttonRoot
        }}
      >
        Create
      </Button>
    </div>
  )
}

export default CreateForm

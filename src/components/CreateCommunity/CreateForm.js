import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import styles from './index.module.css'
import { ADD_COMMUNITY_ASYNC } from '../../redux/actionTypes'

const CreateForm = ({ handleClose }) => {
  const address = useSelector(state => state.ethers.provider.selectedAddress)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [abbr, setAbbr] = useState('')

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleAbbr = (event) => {
    // eventually need to make sure abbr is unique (however ERC20 tokens do it)

    const abbr = event.target.value
    if (abbr && abbr.length > 3) {
      return
    }

    setAbbr(event.target.value)
  }

  const createCom = async () => {
    // validate fields

    const community = {
      name,
      abbr,
      moderatorAddress: address
    }

    dispatch({ type: ADD_COMMUNITY_ASYNC, community })

    handleClose()
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
        onClick={createCom}
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

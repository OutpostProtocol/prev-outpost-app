import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import styles from './index.module.css'
import { COMMUNITIES } from '../../constants'
import { ADD_COMMUNITY } from '../../redux/actionTypes'

const CreateForm = ({ handleClose }) => {
  const address = useSelector(state => state.ethers.provider.selectedAddress)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [abbr, setAbbr] = useState('')

  const createCom = async () => {
    const thread = await window.space.joinThread(name, {
      firstModerator: address,
      members: true
    })

    const community = {
      name,
      abbr,
      address: thread.address
    }

    const communities = await window.space.public.get(COMMUNITIES)

    if (communities) {
      await window.space.public.set(COMMUNITIES, [
        ...communities,
        community
      ])
    } else {
      await window.space.public.set(COMMUNITIES, [
        community
      ])
    }

    // TODO handle errors with requests

    dispatch({ type: ADD_COMMUNITY, community })
    handleClose()
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleAbbr = (event) => {
    const abbr = event.target.value
    if (abbr && abbr.length > 3) {
      return
    }

    setAbbr(event.target.value)
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

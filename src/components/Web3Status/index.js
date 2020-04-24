import React from 'react'
import { Button } from '@material-ui/core'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useSelector, useDispatch } from 'react-redux'
import Box from '3box'

import { SET_ETHERS, SET_BOX, SET_SPACE } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import modalOptions from './modalOptions'
import styles from './index.module.css'

const web3Modal = new Web3Modal(modalOptions)

const Web3Status = () => {
  const web3 = useSelector(state => state.ethers)
  const dispatch = useDispatch()
  const account = web3.provider && web3.provider.selectedAddress

  const signIn = async () => {
    const provider = await web3Modal.connect()
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = 10000
    dispatch({ type: SET_ETHERS, library })
    addBox(library)
  }

  const addBox = async (library) => {
    const address = library.provider.selectedAddress

    const box = await Box.create(library.provider)
    const spaces = ['rainCommunities']
    await box.auth(spaces, { address })
    const space = await box.openSpace('rainCommunities')
    console.log(box, 'BOX AFTER CREATED')

    dispatch({ type: SET_BOX, box })
    dispatch({ type: SET_SPACE, space })
    console.log('SPACE DISPATCHED')
  }

  if (account) {
    return (
      <Button
        disableElevation
        color='primary'
        variant='contained'
        classes={{
          root: styles.buttonRoot
        }}
      >
        <div>{shortenAddress(account)}</div>
      </Button>
    )
  } else {
    return (
      <Button
        onClick={signIn}
        variant='contained'
        disableElevation
        color='primary'
        classes={{
          root: styles.buttonRoot
        }}
      >
        Sign In
      </ Button>
    )
  }
}

export default Web3Status

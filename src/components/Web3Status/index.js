import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { useSelector, useDispatch } from 'react-redux'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import modalOptions from './modalOptions'
import styles from './index.module.css'

const web3Modal = new Web3Modal(modalOptions)

const Web3Status = () => {
  const [isLoading, setIsLoading] = useState(false)
  const web3 = useSelector(state => state.ethers)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()
  const account = web3.provider && web3.provider.selectedAddress

  const signIn = async () => {
    const provider = await web3Modal.connect()
    setIsLoading(true)
    const library = new ethers.providers.Web3Provider(provider)
    library.pollingInterval = 10000
    dispatch({ type: LOGIN_ASYNC, library })
  }

  if (isLoggedIn) {
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
      <div>
        <Backdrop className={styles.backdrop} open={isLoading && !isLoggedIn}>
          <CircularProgress />
        </Backdrop>
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
      </div>
    )
  }
}

export default Web3Status

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import styles from './index.module.css'
import modalOptions from './modalOptions'

const Web3Status = () => {
  const address = useSelector(state => state.address)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const signIn = async () => {
    const modal = new Web3Modal(modalOptions)
    const provider = new ethers.providers.Web3Provider(await modal.connect())
    window.web3 = provider
    setIsLoading(true)
    dispatch({ type: LOGIN_ASYNC })
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
        <div>{shortenAddress(address)}</div>
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

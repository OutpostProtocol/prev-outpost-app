import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Web3 from 'web3'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import styles from './index.module.css'

const Web3Status = () => {
  const address = useSelector(state => state.address)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const getAddress = async () => {
    if (window.ethereum) { // Modern dapp browsers
      window.web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        return window.web3.currentProvider.selectedAddress
      } catch (error) {
        console.log(error)
      }
    } else if (window.web3) { // Legacy dapp browsers
      window.web3 = new Web3(window.web3.currentProvider)
      return window.web3.currentProvider.selectedAddress
    } else { // Browser not web3 enabled
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  const signIn = async () => {
    setIsLoading(true)
    const address = await getAddress()
    dispatch({ type: LOGIN_ASYNC, address })
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

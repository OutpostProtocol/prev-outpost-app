import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Web3 from 'web3'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import ProviderSelector from '../ProviderSelector'
import styles from './index.module.css'

const Web3Status = () => {
  const address = useSelector(state => state.address)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const getAddress = async () => {
    try {
      window.web3 = new Web3(await ProviderSelector())
      return window.web3.currentProvider.selectedAddress
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const signIn = async () => {
    const address = await getAddress()
    if (address) {
      setIsLoading(true)
      dispatch({ type: LOGIN_ASYNC, address })
    }
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

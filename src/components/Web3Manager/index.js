import React, { useEffect } from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { useWeb3React } from '@web3-react/core'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import Web3Status from '../Web3Status'
import Notification from '../Notification'

const Web3Manager = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const { account, active, error } = useWeb3React()
  const dispatch = useDispatch()

  const createLoginAction = () => {
    return { type: LOGIN_ASYNC, account }
  }

  useEffect(() => {
    if (account && active && !isLoggedIn) {
      dispatch(createLoginAction())
    }
    // React guarantees that dispatch function identity is stable and won’t change on re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, active, isLoggedIn])

  return (
    <>
      <Web3Status
        address={account}
      />
      {error &&
        <Notification
          message={error.message}
        />
      }
    </>
  )
}

export default Web3Manager

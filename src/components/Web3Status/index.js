import React, {
  useState,
  useEffect
} from 'react'
import { useDispatch } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Button, CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import Box from '3box'

import { SET_DID } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
})

const Web3Status = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { active, account/*, deactivate */ } = useWeb3React()

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const login = async () => {
      setIsLoading(true)
      console.log('is logged in', Box.isLoggedIn(account))
      const box = await Box.openBox(account, window.web3.provider)
      window.box = box

      dispatch({ type: SET_DID, did: window.box.DID })
      setIsLoading(false)
    }

    if (active && account && window.box === undefined && !isLoading) {
      login()
    }
  }, [active, account, dispatch, isLoading])

  useEffect(() => {
    if (isLoading) {
      setIsWalletModalOpen(false)
    }
  }, [isLoading])

  /*
  const handleWalletChange = async () => {
    await window.box.logout()
    console.log('just logged out', !Box.isLoggedIn(account))
    window.box = undefined
    deactivate()
    setIsWalletModalOpen(true)
  }
  */

  const SignInButton = () => {
    if (isLoading) {
      return (
        <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
        >
          <CircularProgress
            color='secondary'
            style={{
              width: '1em',
              height: '1em'
            }}
          />
        </Web3Button>
      )
    }

    return (
      <Web3Button
        variant='outlined'
        color='secondary'
        disableElevation
        onClick={() => setIsWalletModalOpen(true)}
      >
        SIGN IN
      </Web3Button>
    )
  }

  return (
    <Web3Container>
      {(!active || window.box === undefined)
        ? <SignInButton />
        : <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
          style={{
            cursor: 'default'
          }}
        >
          {shortenAddress(account, 5)}
        </Web3Button>
      }
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status

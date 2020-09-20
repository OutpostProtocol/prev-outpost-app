import React, {
  useState,
  useEffect
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Button, CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import Box from '3box'

import {
  SET_DID, SET_IS_LOGGED_IN
} from '../../redux/actionTypes'
import { useUser } from '../../hooks'
import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'
import NewUserModal from '../NewUserModal'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
  'max-width': '200px',
  right: '20px',
  top: '10px'
})

const Web3Status = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { active, account, deactivate } = useWeb3React()
  const did = useSelector(state => state.did)

  const { data } = useUser(did)
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const dispatch = useDispatch()

  // useEffect(() => {
  //   const hasUserName = data && data.user && data.user.name
  //   if (active && did && !hasUserName) {
  //     setIsNewUserModalOpen(true)
  //   } else if (hasUserName) {
  //     setIsNewUserModalOpen(false)
  //   }
  // }, [data, did, active])

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

  const handleWalletChange = async () => {
    await window.box.logout()
    console.log('just logged out', !Box.isLoggedIn(account))
    window.box = undefined
    deactivate()
    setIsWalletModalOpen(true)
  }

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
          onClick={handleWalletChange}
          variant='outlined'
          color='secondary'
          disableElevation
        >
          {shortenAddress(account, 5)}
        </Web3Button>
      }
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
      />
      <NewUserModal
        open={isNewUserModalOpen}
        handleClose={() => setIsNewUserModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status

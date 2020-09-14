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
import WalletModal from '../WalletModal'
import NewUserModal from '../NewUserModal'

const Web3Button = styled(Button)({
  width: '100%',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
  width: '50%',
  'max-width': '200px',
  position: 'absolute',
  right: '20px',
  top: '10px'
})

const Web3Status = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isLoading, setIsLoading] = useState(false)
  const { active, account } = useWeb3React()
  const did = useSelector(state => state.did)

  const { data } = useUser(did)
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const hasUserName = data && data.user && data.user.name
    if (isLoggedIn && !hasUserName) {
      setIsNewUserModalOpen(true)
    } else if (hasUserName) {
      setIsNewUserModalOpen(false)
    }
  }, [data, isLoggedIn])

  useEffect(() => {
    const login = async () => {
      setIsLoading(true)
      const box = await Box.openBox(account, window.web3.provider)
      window.box = box

      dispatch({ type: SET_DID, did: window.box.DID })
      dispatch({ type: SET_IS_LOGGED_IN, isLoggedIn: true })
      setIsLoading(false)
    }

    if (active && account && !isLoggedIn) {
      login()
    }
  }, [active, account, isLoggedIn, dispatch])

  useEffect(() => {
    if (isLoading) {
      setIsWalletModalOpen(false)
    }
  }, [isLoading])

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
      {!isLoggedIn &&
        <SignInButton />
      }
      <WalletModal
        open={isWalletModalOpen}
        isLoggedIn={isLoggedIn}
        handleClose={() => setIsWalletModalOpen(false)}
        isLoading={isLoading}
      />
      <NewUserModal
        open={isNewUserModalOpen}
        handleClose={() => setIsNewUserModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status

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
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import WalletModal from '../WalletModal'

const Web3Button = styled(Button)({
  width: '80%',
  'margin-left': '10%',
  'border-radius': '4px',
  'margin-bottom': '5px'
})

const Web3Container = styled('div')({
  width: '100%'
})

const LoadingContainer = styled(Backdrop)({
  'z-index': 1200
})

const Web3Status = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const isLoading = useSelector(state => state.isLoading)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { active, account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    const createLoginAction = () => {
      return { type: LOGIN_ASYNC, account }
    }

    if (active && account && !isLoggedIn) {
      dispatch(createLoginAction())
    }
  }, [active, account, isLoggedIn, dispatch])

  useEffect(() => {
    if (isLoading) {
      setIsWalletModalOpen(false)
    }
  }, [isLoading])

  return (
    <Web3Container>
      <LoadingContainer
        open={isLoading}
      >
        <CircularProgress
          disableShrink
        />
      </LoadingContainer>
      {!isLoggedIn &&
        <Web3Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={() => setIsWalletModalOpen(true)}
        >
          Sign In
        </Web3Button>
      }
      <WalletModal
        open={isWalletModalOpen}
        isLoggedIn={isLoggedIn}
        handleClose={() => setIsWalletModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status

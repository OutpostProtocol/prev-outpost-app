import React, {
  useState,
  useEffect
} from 'react'
import {
  useSelector,
  useDispatch
} from 'react-redux'
import { useWeb3React } from '@web3-react/core'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
import { shortenAddress } from '../../utils'
import WalletModal from '../WalletModal'
import Notification from '../Notification'

const Web3Button = styled(Button)({
  width: '80%',
  'margin-left': '10%',
  'border-radius': '4px',
  'margin-bottom': '5px'
})

const Web3Container = styled('div')({
  width: '100%'
})

const ProgressContainer = styled(Backdrop)({
  'z-index': 5
})

const Web3Status = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const dispatch = useDispatch()

  const { account, library, error } = useWeb3React()

  const createLoginAction = () => {
    const web3Credentials = {
      address: account,
      provider: library.provider
    }
    return { type: LOGIN_ASYNC, web3Credentials }
  }

  useEffect(() => {
    if (account && library && !isLoggedIn && !isLoading) {
      setIsLoading(true)
      setIsModalOpen(false)
      dispatch(createLoginAction())
    }
  // React guarantees that dispatch function identity is stable and won’t change on re-renders
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library, isLoggedIn, isLoading])

  if (isLoggedIn) {
    return (
      <Web3Button
        disableElevation
        color='primary'
        variant='contained'
        disableRipple={true}
      >
        <div>{shortenAddress(account)}</div>
      </Web3Button>
    )
  } else {
    return (
      <Web3Container>
        <ProgressContainer open={isLoading && !isLoggedIn}>
          <CircularProgress />
        </ProgressContainer>
        <Web3Button
          onClick={() => setIsModalOpen(true)}
          variant='contained'
          disableElevation
          color='primary'
        >
          Sign In
        </Web3Button>
        <WalletModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        />
        {error &&
          <Notification
            message={error.message}
          />
        }
      </Web3Container>
    )
  }
}

export default Web3Status

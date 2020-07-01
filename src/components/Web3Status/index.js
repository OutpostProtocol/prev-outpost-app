import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

import WalletModal from '../WalletModal'
import { shortenAddress } from '../../utils'

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
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const { account } = useWeb3React()

  if (isLoggedIn && account) {
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
        <LoadingContainer
          open={account !== undefined && !isLoggedIn}
        >
          <CircularProgress
            disableShrink
          />
        </LoadingContainer>
        <Web3Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={() => setIsWalletModalOpen(true) }
        >
          Sign In
        </Web3Button>
        <WalletModal
          open={isWalletModalOpen}
          handleClose={() => setIsWalletModalOpen(false) }
        />
      </Web3Container>
    )
  }
}

export default Web3Status

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'
import {
  Button,
  Backdrop,
  CircularProgress
} from '@material-ui/core'

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

const Web3Status = ({ address }) => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsWalletModalOpen(false)
  }

  const handleModalOpen = () => {
    setIsWalletModalOpen(true)
  }

  if (isLoggedIn) {
    return (
      <Web3Button
        disableElevation
        color='primary'
        variant='contained'
        disableRipple={true}
      >
        <div>{shortenAddress(address)}</div>
      </Web3Button>
    )
  } else {
    return (
      <Web3Container>
        <LoadingContainer
          open={address !== undefined && !isLoggedIn}
        >
          <CircularProgress
            disableShrink
          />
        </LoadingContainer>
        <Web3Button
          variant='contained'
          color='primary'
          disableElevation
          onClick={() => {
            handleModalOpen()
          }}
        >
          Sign In
        </Web3Button>
        <WalletModal
          open={isWalletModalOpen}
          handleClose={handleModalClose}
        />
      </Web3Container>
    )
  }
}

export default Web3Status

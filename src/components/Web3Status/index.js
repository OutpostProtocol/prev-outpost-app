import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import {
  Button, CircularProgress
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

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
  const [signInLoading, setSignInLoading] = useState(false)
  const { active, account } = useWeb3React()

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const SignInButton = () => {
    if (signInLoading) {
      return (
        <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
          style={{
            cursor: 'auto'
          }}
        >
          <CircularProgress
            style={{
              height: '1em',
              width: '1em',
              color: '#7000FF'
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
      {(!active || !account)
        ? <SignInButton />
        : <Web3Button
          variant='outlined'
          color='secondary'
          disableElevation
          onClick={() => setIsWalletModalOpen(true)}
        >
          {shortenAddress(account, 5)}
        </Web3Button>
      }
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
        setPrevLoading={setSignInLoading}
      />
    </Web3Container>
  )
}

export default Web3Status

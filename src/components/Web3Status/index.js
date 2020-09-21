import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

import WalletModal from '../WalletModal'
import {
  LAST_CONNECTOR,
  LAST_EMAIL,
  CONNECTOR_NAMES
} from '../../constants'
import {
  shortenAddress,
  storageAvailable
} from '../../utils'
import {
  WalletConnect,
  MagicData,
  MetaMask
} from '../WalletModal/walletOptions'

const Web3Button = styled(Button)({
  width: '150px',
  height: '2.6em',
  'border-radius': '4px'
})

const Web3Container = styled('div')({
  width: '180px',
  'max-width': '200px',
  right: '20px',
  top: '10px'
})

const Web3Status = () => {
  const { active, account, activate } = useWeb3React()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const initial = useRef(true)

  useEffect(() => {
    const loadLastWallet = () => {
      if (storageAvailable('localStorage')) {
        return window.localStorage.getItem(LAST_CONNECTOR)
      } else {
        return null
      }
    }

    const autoConnect = async (connector) => {
      if (connector === CONNECTOR_NAMES.walletConnect) {
        await activate(WalletConnect.connector)
      } else if (connector === CONNECTOR_NAMES.injected) {
        await activate(MetaMask.connector)
      } else if (connector === CONNECTOR_NAMES.magic) {
        const email = window.localStorage.getItem(LAST_EMAIL)
        if (email) {
          MagicData.connector.setEmail(email)
          await activate(MagicData.connector)
        }
      }
    }

    const prevWallet = loadLastWallet()
    if (prevWallet && initial.current && !active) { // if there's a prev wallet, activate it.
      autoConnect(prevWallet)
      initial.current = false
    }
  }, [activate, active])

  useEffect(() => {
    if (active && account) {
      setIsWalletModalOpen(false)
    }
  }, [active, account])

  const AccountButton = () => {
    if (!active || !account) {
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
      <Web3Button
        variant='outlined'
        color='secondary'
        disableElevation
        onClick={() => setIsWalletModalOpen(true)}
      >
        {shortenAddress(account)}
      </Web3Button>
    )
  }

  return (
    <Web3Container>
      <AccountButton />
      <WalletModal
        open={isWalletModalOpen}
        handleClose={() => setIsWalletModalOpen(false)}
      />
    </Web3Container>
  )
}

export default Web3Status

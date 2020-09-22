import {
  useEffect, useRef
} from 'react'
import store from 'store'
import { useWeb3React } from '@web3-react/core'

import {
  WalletConnect,
  MagicData,
  MetaMask
} from '../components/WalletModal/walletOptions'
import {
  LAST_CONNECTOR, LAST_EMAIL, CONNECTOR_NAMES
} from '../constants'

const usePrevWallet = () => {
  const { active, activate } = useWeb3React()
  const initial = useRef(true)

  useEffect(() => {
    const loadLastWallet = () => {
      return store.get(LAST_CONNECTOR)
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
}

export default usePrevWallet

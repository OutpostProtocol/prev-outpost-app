import {
  useEffect, useRef, useState
} from 'react'
import store from 'store'
import { useWeb3React } from '@web3-react/core'

import {
  MagicData,
  MetaMask
} from '../components/WalletModal/walletOptions'
import {
  LAST_CONNECTOR, LAST_EMAIL, CONNECTOR_NAMES
} from '../constants'

const usePrevWallet = () => {
  const [isPrevLoading, setPrevLoading] = useState(false)
  const { active, activate } = useWeb3React()
  const initial = useRef(true)

  useEffect(() => {
    const loadLastWallet = () => {
      return store.get(LAST_CONNECTOR)
    }

    // no autoconnect for WC because it just creates the wc popup
    const autoConnect = async (connector) => {
      if (connector === CONNECTOR_NAMES.injected) {
        await activate(MetaMask.connector)
      } else if (connector === CONNECTOR_NAMES.magic) {
        const email = store.get(LAST_EMAIL)
        if (email) {
          setPrevLoading(true)
          MagicData.connector.setEmail(email)
          await activate(MagicData.connector)
          setPrevLoading(false)
        }
      }
    }

    const prevWallet = loadLastWallet()
    // if there's a prev wallet, activate it.
    if (prevWallet && initial.current && !active) {
      autoConnect(prevWallet)
      initial.current = false
    }
  }, [activate, active])

  return { isPrevLoading }
}

export default usePrevWallet

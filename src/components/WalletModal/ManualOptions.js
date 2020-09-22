import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import store from 'store'

import {
  ERROR_TYPES,
  LAST_CONNECTOR,
  CONNECTOR_NAMES
} from '../../constants'
import {
  MetaMask, WalletConnect
} from './walletOptions'

const Container = styled('div')({
  display: 'flex',
  padding: '0 5%',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafa'
  },
  'max-width': '300px',
  margin: 'auto'
})

const Holder = styled('div')({
  padding: '0 10% 10%'
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto',
  height: '50px'
})

const OptionName = styled('h3')({
  'font-weight': 300
})

const ManualOptions = ({ closeModal }) => {
  const options = [MetaMask, WalletConnect]
  const [isInitializing, setIsInitializing] = useState(false)
  const [connector, setConnector] = useState(null)
  const { active, activate, deactivate } = useWeb3React()
  const mixpanel = useMixpanel()

  useEffect(() => {
    const handleError = (error) => {
      const info = {
        type: ERROR_TYPES.login,
        message: error.message
      }
      mixpanel.track('Error', info)
    }

    const setLastConnector = (connectorName) => {
      store.set(LAST_CONNECTOR, connectorName)
    }

    const handleConnect = async () => {
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
        setLastConnector(CONNECTOR_NAMES.walletConnect)
      } else if (connector instanceof InjectedConnector) {
        setLastConnector(CONNECTOR_NAMES.injected)
      }

      await activate(connector, handleError)
      setIsInitializing(false)
      closeModal()
    }

    if (!isInitializing && connector && !active) {
      setIsInitializing(true)
      handleConnect()
    }
  }, [isInitializing, activate, connector, mixpanel, closeModal, active])

  const connect = (curConnector) => {
    if (active) {
      deactivate()
    }
    setConnector(curConnector)
  }

  const Option = ({ wallet }) => (
    <Container
      onClick={() => connect(wallet.connector)}
    >
      <OptionName>
        {wallet.name}
      </OptionName>
      <Logo
        src={wallet.imgSrc}
        alt={wallet.name}
      />
    </Container>
  )

  return (
    <Holder>
      {
        options.map((opt, i) => <Option key={i} wallet={opt} />)
      }
    </Holder>
  )
}

export default ManualOptions

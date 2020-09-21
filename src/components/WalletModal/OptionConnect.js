import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'

import {
  MetaMask,
  WalletConnect
} from './walletOptions'
import { storageAvailable } from '../../utils'
import {
  LAST_CONNECTOR,
  CONNECTOR_NAMES
} from '../../constants'

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

const OptionConnect = () => {
  const options = [MetaMask, WalletConnect]
  const [isInitializing, setIsInitializing] = useState(false)
  const [connector, setConnector] = useState(null)
  const { active, activate, deactivate } = useWeb3React()

  useEffect(() => {
    const setLastConnector = (connectorName) => {
      if (storageAvailable('localStorage')) window.localStorage.setItem(LAST_CONNECTOR, connectorName)
    }

    const connect = async () => {
      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
        setLastConnector(CONNECTOR_NAMES.walletConnect)
      } else if (connector instanceof InjectedConnector) {
        setLastConnector(CONNECTOR_NAMES.injected)
      }
      console.log('connecting from option')
      await activate(connector)
      console.log('done connecting from option')
      setIsInitializing(false)
    }

    if (!isInitializing && connector) {
      connect()
      setIsInitializing(true)
    }
  }, [isInitializing, connector, activate])

  const connect = async (connector) => {
    if (active) {
      deactivate()
    }
    setConnector(connector)
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

export default OptionConnect

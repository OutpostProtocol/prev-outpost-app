import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { useMixpanel } from 'gatsby-plugin-mixpanel'

import { ERROR_TYPES } from '../../constants'

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

const MetaMaskConnect = () => {
  const options = [MetaMask, WalletConnect]
  const [isInitializing, setIsInitializing] = useState(false)
  const [connector, setConnector] = useState(null)
  const { activate } = useWeb3React()
  const mixpanel = useMixpanel()

  useEffect(() => {
    const handleError = (error) => {
      const info = {
        type: ERROR_TYPES.login,
        message: error.message
      }
      mixpanel.track('Error', info)
    }

    const connect = async () => {
      if (isInitializing) {
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
          connector.walletConnectProvider = undefined
        }

        await activate(connector, handleError)
      }
    }
    connect()
  }, [isInitializing, activate, connector, mixpanel])

  const connect = (curConnector) => {
    setConnector(curConnector)

    // if not already initalizing, initialize and try activiating in useEffect hook
    if (!isInitializing) {
      setIsInitializing(true)
    }
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

export default MetaMaskConnect

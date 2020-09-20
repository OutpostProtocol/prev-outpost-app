import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'

import {
  MetaMask, WalletConnect
} from './walletOptions'

const Container = styled('div')({
  display: 'flex',
  padding: '0 5%',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#f4f3f0'
  }
})

const Holder = styled('div')({
  padding: '0 10% 10%'
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto'
})

const OptionName = styled('h3')({
  'font-weight': 100
})

const MetaMaskConnect = () => {
  const options = [MetaMask, WalletConnect]
  const [isInitializing, setIsInitializing] = useState(false)
  const [connector, setConnector] = useState(null)
  const { activate } = useWeb3React()

  useEffect(() => {
    const connect = async () => {
      if (isInitializing) {
        await activate(connector)
      }
    }
    connect()
  }, [isInitializing, activate, connector])

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

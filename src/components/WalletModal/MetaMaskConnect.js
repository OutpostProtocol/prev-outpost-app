import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { styled } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

import { MetaMask } from './walletOptions'

const Container = styled('div')({
  display: 'flex',
  padding: '0 5%',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#f4f3f0'
  }
})

const Holder = styled('div')({
  padding: '10% 10%'
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto'
})

const OptionName = styled('h3')({
  'font-weight': 100
})

const MetaMaskConnect = () => {
  const { imgSrc, name, connector, prepare, setup } = MetaMask
  const [isInitializing, setIsInitializing] = useState(false)
  const { activate } = useWeb3React()
  const config = useRef({})

  useEffect(() => {
    const connect = async () => {
      if (isInitializing) {
        if (prepare) prepare(connector, config.current)
        await activate(connector)
        if (setup) setup(connector)
        setIsInitializing(false)
      }
    }
    connect()
  }, [isInitializing, connector, prepare, setup, activate, name])

  const connect = () => {
    // if not already initalizing, initialize and try activiating in useEffect hook
    if (MetaMask.connector && !isInitializing) {
      setIsInitializing(true)
    }
  }

  return (
    <Holder>
      <Container
        onClick={() => connect()}
      >
        <OptionName>
          {name}
        </OptionName>
        {isInitializing &&
        <CircularProgress
          disableShrink
        />
        }
        <Logo
          src={imgSrc}
          alt={name}
        />
      </Container>
    </Holder>
  )
}

export default MetaMaskConnect

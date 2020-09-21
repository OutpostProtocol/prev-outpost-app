import React, {
  useEffect, useState, useRef
} from 'react'
import { MagicData } from './walletOptions'
import { useWeb3React } from '@web3-react/core'
import {
  TextField, Button, CircularProgress
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

const EmailField = styled(TextField)({
  width: '100%',
  'padding-bottom': '3vh'
})

const Container = styled('div')({
  padding: '15% 10% 0 10%',
  display: 'flex',
  'flex-direction': 'column'
})

const ConnectButton = styled(Button)({
  width: '100%',
  height: '40px',
  'max-width': '200px',
  margin: 'auto'
})

const UploadProgress = styled(CircularProgress)({
  color: '#f1f1f1'
})

const MagicConnect = () => {
  const { name, connector, prepare, setup } = MagicData
  const [isInitializing, setIsInitializing] = useState(false)
  const { activate } = useWeb3React()
  const config = useRef({})

  const handleEmail = (event) => {
    if (event && event.target && event.target.value) {
      config.current.email = event.target.value
    }
  }

  useEffect(() => {
    const connect = async () => {
      if (isInitializing) {
        console.log('prepare')
        if (prepare) prepare(connector, config.current)
        console.log('connect')
        await activate(connector)
        console.log('setup')
        if (setup) setup(connector)
        setIsInitializing(false)
        console.log('done')
      }
    }
    connect()
  }, [isInitializing, connector, prepare, setup, activate, name])

  const connect = () => {
    // if not already initalizing, initialize and try activiating in useEffect hook
    if (MagicData.connector && !isInitializing) {
      console.log('setting init to true')
      setIsInitializing(true)
    }
  }

  return (
    <Container>
      <EmailField
        variant='outlined'
        label='EMAIL'
        onChange={handleEmail}
      />
      {isInitializing
        ? <ConnectButton
          variant='contained'
          disableElevation
          color='secondary'
        >
          <UploadProgress
            style={{
              width: '1.5em',
              height: '1.5em'
            }}
          />
        </ConnectButton>
        : <ConnectButton
          onClick={() => connect()}
          variant='contained'
          disableElevation
          color='secondary'
        >
          CONTINUE
        </ConnectButton>
      }
    </Container>
  )
}

export default MagicConnect

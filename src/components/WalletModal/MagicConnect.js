import React, {
  useEffect, useState, useRef
} from 'react'
import { MagicData } from './walletOptions'
import { useWeb3React } from '@web3-react/core'
import {
  TextField, Button, CircularProgress
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { useMixpanel } from 'gatsby-plugin-mixpanel'

import { ERROR_TYPES } from '../../constants'

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
  const { connector, prepare, setup } = MagicData
  const [isInitializing, setIsInitializing] = useState(false)
  const { activate } = useWeb3React()
  const config = useRef({})
  const mixpanel = useMixpanel()

  const handleEmail = (event) => {
    if (event && event.target && event.target.value) {
      config.current.email = event.target.value
    }
  }

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
        if (prepare) prepare(connector, config.current)
        await activate(connector, handleError)
        if (setup) setup(connector)
        setIsInitializing(false)
      }
    }
    connect()
  }, [isInitializing, connector, prepare, setup, activate, mixpanel])

  const connect = () => {
    // if not already initalizing, initialize and try activiating in useEffect hook
    if (MagicData.connector && !isInitializing) {
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

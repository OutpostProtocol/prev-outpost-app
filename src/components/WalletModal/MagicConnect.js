import React from 'react'
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

const MagicConnect = ({ handleConnect, isInitializing, handleEmail }) => {
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
          onClick={() => handleConnect()}
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

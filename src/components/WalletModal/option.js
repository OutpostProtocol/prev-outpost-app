import React, {
  useState,
  useEffect,
  useRef
} from 'react'
import { styled } from '@material-ui/core/styles'
import {
  CircularProgress,
  Button,
  TextField
} from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'

const DetailedOptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '5px',
  'flex-wrap': 'wrap',
  'border-radius': '4px',
  'box-sizing': 'border-box',
  'align-items': 'center',
  'justify-content': 'left'
})

const OptionContainer = styled(DetailedOptionContainer)({
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafae8'
  }
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto'
})

const OptionName = styled('h3')({
  'font-weight': 100
})

const ConnectButton = styled(Button)({
  color: 'black',
  'margin-left': '10px'
})

const EmailField = styled(TextField)({
  width: '150px',
  'margin-left': '5px'
})

const Option = ({ options, showDetailedView, setDetailedView }) => {
  const { imgSrc, name, connector, prepare, setup } = options
  const [isInitializing, setIsInitializing] = useState(showDetailedView && name !== 'Magic')
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
    if (options.connector && !isInitializing) {
      setIsInitializing(true)
    }
  }

  const Container = showDetailedView ? DetailedOptionContainer : OptionContainer

  return (
    <Container
      onClick={() => { if (!showDetailedView) setDetailedView(options, false) }}
    >
      <OptionName>
        {name}
        &nbsp;
      </OptionName>
      {isInitializing &&
        <CircularProgress
          disableShrink
        />
      }
      { name === 'Magic' && showDetailedView && !isInitializing &&
        <EmailField
          variant='outlined'
          label='Email'
          onChange={handleEmail}
        />
      }
      {(!isInitializing && showDetailedView) &&
        <ConnectButton
          onClick={() => connect()}
          variant='contained'
          disableElevation
        >
          Connect
        </ConnectButton>
      }
      <Logo
        src={imgSrc}
        alt={name}
      />
    </Container>
  )
}

export default Option

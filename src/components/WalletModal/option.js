import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import {
  CircularProgress,
  Button
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

const DesciptionContainer = styled('div')({
  'margin-top': '20px',
  'font-weight': 50
})

const ConnectButton = styled(Button)({
  color: 'black',
  'margin-left': '10px'
})

const Option = ({ options, showDetailedView, setDetailedView }) => {
  const [isInitializing, setIsInitializing] = useState(false)
  const { imgSrc, name, description, connector, prepare, setup } = options
  const { activate, deactivate } = useWeb3React()

  useEffect(() => {
    const connect = async () => {
      if (isInitializing) {
        if (prepare) prepare(connector)
        await activate(connector)
        if (setup) setup(connector)
        setIsInitializing(false)
      }
    }
    connect()
  }, [isInitializing, connector, options, setDetailedView, prepare, setup, activate, deactivate])

  const connect = () => {
    // if not already initalizing, initialize and try activiating
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
      {showDetailedView &&
        <DesciptionContainer>
          {description}
        </DesciptionContainer>
      }
    </Container>
  )
}

export default Option

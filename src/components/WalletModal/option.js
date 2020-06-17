import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import {
  CircularProgress
} from '@material-ui/core'

const OptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '5px',
  'border-radius': '4px',
  'box-sizing': 'border-box',
  'align-items': 'center',
  'justify-content': 'center',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafae8'
  }
})

const Logo = styled('img')({
  width: '64px',
  'margin-left': 'auto'
})

const OptionName = styled('h4')({
  fontWeight: 'normal'
})

const Option = ({ imgSrc, optionName, connector }) => {
  const web3Context = useWeb3React()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (web3Context.active || web3Context.error) {
      setIsLoading(false)
    }
  }, [web3Context])

  const handleConnection = async () => {
    if (connector) {
      setIsLoading(true)
      web3Context.activate(connector)
    }
  }

  return (
    <OptionContainer
      onClick={handleConnection}
    >
      <OptionName>
        {optionName}
        &nbsp;
      </OptionName>
      {isLoading &&
        <CircularProgress />
      }
      <Logo
        src={imgSrc}
        alt={optionName}
      />
    </OptionContainer>
  )
}

export default Option

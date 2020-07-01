import React, {
  useState,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import { useWeb3React } from '@web3-react/core'
import { CircularProgress } from '@material-ui/core'

const OptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '5px',
  overflow: 'hidden',
  transition: 'max-height 0.7s ease-in-out',
  '-webkit-transition': 'max-height 0.7s ease-in-out',
  'max-height': '70px',
  'flex-wrap': 'wrap',
  'border-radius': '4px',
  'box-sizing': 'border-box',
  'align-items': 'center',
  'justify-content': 'left',
  '&:hover': {
    cursor: 'pointer',
    'background-color': '#fafafae8',
    'max-height': '300px'
  }
})

const Logo = styled('img')({
  width: '50px',
  'margin-left': 'auto'
})

const OptionName = styled('h4')({
  fontWeight: 'bold'
})

const Option = ({ options }) => {
  const { imgSrc, name, connector } = options
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
        {name}
        &nbsp;
      </OptionName>
      {isLoading &&
        <CircularProgress />
      }
      <Logo
        src={imgSrc}
        alt={name}
      />
    </OptionContainer>
  )
}

export default Option

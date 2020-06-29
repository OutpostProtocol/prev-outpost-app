import React from 'react'
import { styled } from '@material-ui/core/styles'
import {
  CircularProgress,
  IconButton
} from '@material-ui/core'
import { Sync } from '@material-ui/icons'

const OptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  padding: '5px',
  'flex-wrap': 'wrap',
  'border-radius': '4px',
  'box-sizing': 'border-box',
  'align-items': 'center',
  'justify-content': 'left',
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
  'margin-top': '20px'
})

const TryAgainButton = styled(IconButton)({
  'margin-left': '5px',
  color: 'inherit'
})

const Option = ({ options, handleConnection, showDescription, isInitializing }) => {
  const { imgSrc, name, description } = options

  return (
    <OptionContainer
      onClick={() => { if (!isInitializing) handleConnection() }}
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
      {(!isInitializing && showDescription) &&
        < TryAgainButton
          onClick={() => handleConnection()}
        >
          <Sync/>
        </TryAgainButton>
      }
      <Logo
        src={imgSrc}
        alt={name}
      />
      {showDescription &&
        <DesciptionContainer>
          {description}
        </DesciptionContainer>
      }
    </OptionContainer>
  )
}

export default Option

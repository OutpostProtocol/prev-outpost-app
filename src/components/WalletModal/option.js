import React from 'react'
import { styled } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

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

const Option = ({ options, handleConnection, showDescription }) => {
  const { imgSrc, name, description } = options

  return (
    <OptionContainer
      onClick={() => handleConnection()}
    >
      <OptionName>
        {name}
        &nbsp;
      </OptionName>
      {showDescription &&
        <CircularProgress
          disableShrink
        />
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

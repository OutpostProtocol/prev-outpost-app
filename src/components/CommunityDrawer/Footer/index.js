import React from 'react'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import {
  GitHub,
  Language
} from '@material-ui/icons'

const FooterContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'space-evenly',
  width: '80%',
  padding: '0 10%'
})

const ExternalLink = styled('a')({
  height: '24px'
})

const Icon = styled(IconButton)({
  'margin-bottom': '10px'
})

const Footer = () => {
  return (
    <FooterContainer>
      <Icon>
        <ExternalLink
          href='https://github.com/ClearRainLabs'
          rel='noopener noreferrer'
          target='_blank'
        >
          <GitHub
            color='primary'
            label='Github'
          >
          </GitHub>
        </ExternalLink>
      </Icon>
      <Icon>
        <ExternalLink
          href='https://clearrain.xyz/'
          rel='noopener noreferrer'
          target='_blank'
        >
          <Language
            color='primary'
            label='Blog'
          >
          </Language>
        </ExternalLink>
      </Icon>
    </FooterContainer>
  )
}
export default Footer

import React from 'react'
import { styled } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'
import LanguageIcon from '@material-ui/icons/Language'
import TwitterIcon from '@material-ui/icons/Twitter'

const FooterContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  'margin-left': 10
})

const IconContainer = styled('div')({
  padding: '10px'
})

const Icon = styled(IconButton)({
  margin: '0 auto'
})

const Footer = () => {
  return (
    <FooterContainer>
      <IconContainer>
        <Icon>
          <a
            href="https://github.com/ClearRainLabs"
            rel="noopener noreferrer"
            target='_blank'
          >
            <GitHubIcon
              color='primary'
              label='Github'
            >
            </GitHubIcon>
          </a>
        </Icon>
      </IconContainer>
      <IconContainer>
        <Icon>
          <a
            href="https://clearrain.xyz/"
            rel="noopener noreferrer"
            target='_blank'
          >
            <LanguageIcon
              color='primary'
              label='Blog'
            >
            </LanguageIcon>
          </a>
        </Icon>
      </IconContainer>
      <IconContainer>
        <Icon>
          <a
            href="https://twitter.com/clear__rain"
            rel="noopener noreferrer"
            target='_blank'
          >
            <TwitterIcon
              color='primary'
              label='Blog'
            >
            </TwitterIcon>
          </a>
        </Icon>
      </IconContainer>
    </FooterContainer>
  )
}
export default Footer

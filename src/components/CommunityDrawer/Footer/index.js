import React from 'react'
import { styled } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '@material-ui/icons/GitHub'
import LanguageIcon from '@material-ui/icons/Language'

const FooterContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  'justify-content': 'space-evenly',
  width: '80%',
  padding: '0 10%'
})

const Icon = styled(IconButton)({
  margin: '0 auto'
})

const Footer = () => {
  return (
    <FooterContainer>
      <div>
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
      </div>
      <div>
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
      </div>
    </FooterContainer>
  )
}
export default Footer

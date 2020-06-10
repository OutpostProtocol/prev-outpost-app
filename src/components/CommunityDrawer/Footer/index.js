import React from 'react'
import { styled } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
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

const Icon = styled(IconButton)({
  margin: '0 auto',
  width: '40px',
  height: '40px'
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
            <GitHub
              color='primary'
              label='Github'
            >
            </GitHub>
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
            <Language
              color='secondary'
              label='Blog'
            >
            </Language>
          </a>
        </Icon>
      </div>
    </FooterContainer>
  )
}
export default Footer

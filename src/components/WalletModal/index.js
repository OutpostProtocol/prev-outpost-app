import React from 'react'
import {
  Dialog,
  IconButton,
  Fade
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'

import MetaMaskConnect from './MetaMaskConnect'
import MagicConnect from './MagicConnect'

const ModalContainer = styled(Dialog)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const ContentContainer = styled('div')({
  width: '75vw',
  'background-clip': 'content-box',
  'border-radius': '4px',
  'background-color': '#FFFFFE',
  'max-width': '400px'
})

const ExitButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  padding: 0,
  position: 'absolute',
  top: '5px',
  right: '5px'
})

const OrContainer = styled('div')({
  padding: '10% 0 5%',
  display: 'flex',
  'justify-content': 'space-around'
})

const WalletModal = ({ open, handleClose }) => {
  const ModalContent = (
    <ContentContainer>
      <ExitButton
        onClick={handleClose}
      >
        <Close />
      </ExitButton>
      <MagicConnect />
      <OrContainer>
        <i>&mdash;OR&mdash;</i>
      </OrContainer>
      <MetaMaskConnect />
    </ContentContainer>
  )

  return (
    <ModalContainer
      open={open}
      onClose={handleClose}
    >
      <Fade
        in={open}
      >
        {ModalContent}
      </Fade>
    </ModalContainer>
  )
}

export default WalletModal

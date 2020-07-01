import React from 'react'
import {
  Dialog,
  IconButton,
  Fade
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import modalOptions from './modalOptions'
import Option from './option'

const ContentContainer = styled('div')({
  padding: '10px',
  width: '20vw',
  'background-color': 'white',
  'border-radius': '4px'
})

const ModalContainer = styled(Dialog)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const Heading = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  'padding-left': '5px'
})

const ExitButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  'margin-left': 'auto'
})

const WalletModal = ({ open, handleClose }) => {
  const ModalContent = (
    <ContentContainer>
      <Heading>
        <h3>
          Select a Wallet
        </h3>
        <ExitButton
          onClick={handleClose}
        >
          <CloseIcon />
        </ExitButton>
      </Heading>
      {modalOptions.map((wallet, index) => {
        return (
          <Option
            options={wallet}
            key={index}
          />
        )
      })}
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

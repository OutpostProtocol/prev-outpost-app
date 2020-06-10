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

const Footer = styled('div')({
  'margin-top': '15px',
  'margin-left': '5px'
})

const WalletModal = ({ open, handleClose }) => {
  const ModalContent = (
    <ContentContainer>
      <Heading>
        <h4>Select a Wallet</h4>
        <ExitButton
          onClick={handleClose}
        >
          <CloseIcon />
        </ExitButton>
      </Heading>
      {modalOptions.map((wallet, index) => {
        return (
          <Option
            connector={wallet.connector}
            imgSrc={wallet.imgSrc}
            optionName={wallet.name}
            key={index}
          />
        )
      })}
      <Footer>
        Don't know where to start?&nbsp;
        <a
          href="https://clearrain.xyz/"
          rel="noopener noreferrer"
          target='_blank'
        >
          Find more information on Ethereum wallets here
        </a>
      </Footer>
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

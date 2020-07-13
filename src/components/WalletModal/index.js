import React, { useState } from 'react'
import {
  Dialog,
  IconButton,
  Fade
} from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import {
  Close,
  ChevronLeft
} from '@material-ui/icons'

import walletOptions from './walletOptions'
import Option from './option'

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

const ContentContainer = styled('div')({
  padding: '10px',
  width: '22vw',
  'background-clip': 'content-box',
  'border-radius': '4px'
})

const ExitButton = styled(IconButton)({
  width: '40px',
  height: '40px',
  padding: 0,
  'margin-left': 'auto'
})

const Footer = styled('div')({
  'margin-top': '15px',
  'margin-left': '5px'
})

const WalletModal = ({ open, handleClose }) => {
  const [detailedView, setDetailedView] = useState(undefined)

  const optionFactory = (walletOptions, showDetailedView) => {
    return (
      <Option
        key={walletOptions.name}
        options={walletOptions}
        showDetailedView={showDetailedView}
        setDetailedView={(options) => setDetailedView(optionFactory(options, true)) }
      />
    )
  }

  const ModalContent = (
    <ContentContainer>
      <Heading>
        {detailedView ? (
          <>
            <h3>
              Initializing
            </h3>
            <ExitButton
              onClick={() => setDetailedView(undefined)}
              disableRipple={true}
            >
              <ChevronLeft />
            </ExitButton>
          </>
        ) : (
          <>
            <h3>
              Select A Wallet
            </h3>
            <ExitButton
              onClick={handleClose}
            >
              <Close />
            </ExitButton>
          </>
        )}
      </Heading>
      {detailedView ||
        walletOptions.map((option, index) => {
          return (
            optionFactory(option, false)
          )
        })
      }
      {!detailedView &&
        <Footer>
          New to Ethereum?&nbsp;
          <a
            href='https://clearrain.xyz/'
            rel='noopener noreferrer'
            target='_blank'
          >
            Learn more about wallets
          </a>
        </Footer>
      }
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

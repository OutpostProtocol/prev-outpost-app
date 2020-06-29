import React, {
  useState,
  useEffect
} from 'react'
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
import { useWeb3React } from '@web3-react/core'

import modalOptions from './modalOptions'
import Option from './option'
import Notification from '../Notification'

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

const ContentContainer = styled('div')({
  padding: '10px',
  width: '20vw',
  'background-clip': 'content-box',
  'border-radius': '4px'
})

const WalletModal = ({ open, handleClose }) => {
  const [isPendingActivation, setIsPendingActivation] = useState(false)
  const [selectedOptionView, setSelectedOptionView] = useState(false)
  const { activate, active, error, setError } = useWeb3React()

  useEffect(() => {
    if (active) {
      handleClose()
    }
  }, [active, handleClose])

  const handleConnection = async (walletOptions) => {
    if (!active && walletOptions.connector) {
      setSelectedOptionView(
        <Option
          options={walletOptions}
          handleConnection={() => handleConnection(walletOptions)}
          showDescription={true}
          isInitializing={true}
        />
      )
      if (walletOptions.proact !== undefined) walletOptions.proact(walletOptions.connector)
      setIsPendingActivation(true)
      await activate(walletOptions.connector)
      if (walletOptions.react !== undefined) walletOptions.react(walletOptions.connector)
    }
    setSelectedOptionView(
      <Option
        options={walletOptions}
        handleConnection={() => handleConnection(walletOptions)}
        showDescription={true}
        isInitializing={false}
      />
    )
  }

  const handleStopActivation = () => {
    setIsPendingActivation(false)
  }

  const ModalContent = (
    <ContentContainer>
      <Heading>
        {isPendingActivation ? (
          <>
            <h3>
              Initializing
            </h3>
            <ExitButton
              onClick={handleStopActivation}
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
              <Close/>
            </ExitButton>
          </>
        )}
      </Heading>
      {isPendingActivation ? (
        selectedOptionView
      ) : modalOptions.map((wallet, index) => {
        return (
          <Option
            options={wallet}
            key={index}
            handleConnection={() => handleConnection(wallet)}
            showDescription={false}
            isInitializing={false}
          />
        )
      })}
      <Footer>
        New to Ethereum?&nbsp;
        <a
          href="https://clearrain.xyz/"
          rel="noopener noreferrer"
          target='_blank'
        >
          Learn more about wallets
        </a>
      </Footer>
      {(error && open) &&
        <Notification
          message={error.message}
          onClose={() => setError(undefined)}
        />
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

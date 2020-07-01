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
import { useDispatch } from 'react-redux'

import { LOGIN_ASYNC } from '../../redux/actionTypes'
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
  'margin-left': 'auto',
  padding: 0
})

const Footer = styled('div')({
  'margin-top': '15px',
  'margin-left': '5px'
})

const WalletModal = ({ open, handleClose }) => {
  const [detailedView, setDetailedView] = useState(undefined)
  const { active, account } = useWeb3React()
  const dispatch = useDispatch()

  useEffect(() => {
    const createLoginAction = () => {
      return { type: LOGIN_ASYNC, account }
    }

    if (active && account) {
      dispatch(createLoginAction())
      handleClose()
    }
  }, [active, account, handleClose, dispatch])

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
              Connect
            </h3>
            <ExitButton
              onClick={() => setDetailedView(undefined)}
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
            href="https://clearrain.xyz/"
            rel="noopener noreferrer"
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

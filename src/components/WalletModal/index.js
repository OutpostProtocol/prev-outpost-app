import React, {
  useState, useEffect, useRef, useCallback
} from 'react'
import {
  Dialog,
  IconButton,
  Fade,
  Button,
  Snackbar,
  LinearProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/alert'
import { styled } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import { useWeb3React } from '@web3-react/core'
import {
  WalletConnectConnector, UserRejectedRequestError
} from '@web3-react/walletconnect-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useMixpanel } from 'gatsby-plugin-mixpanel'
import store from 'store'
import {
  useMutation, gql
} from '@apollo/client'
import { ethers } from 'ethers'

import { MagicConnector } from '../../connectors/magicConnector'
import ManualOption from './ManualOption'
import MagicConnect from './MagicConnect'
import { shortenAddress } from '../../utils'
import {
  MetaMask, WalletConnect, MagicData
} from './walletOptions'
import {
  ERROR_TYPES,
  LAST_CONNECTOR,
  CONNECTOR_NAMES,
  LAST_EMAIL,
  LOGIN_TOKEN,
  WC_PROBLEM_WALLETS
} from '../../constants'
import usePrevWallet from '../../hooks/usePrevWallet'

const manualOptions = [MetaMask, WalletConnect]

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

const AcctHeader = styled('div')({
  padding: '5vh 5%'
})

const AcctBody = styled('div')({
  color: '#7000FF',
  display: 'flex',
  'align-items': 'center',
  'justify-content': 'space-between',
  padding: '10px 5px',
  margin: '0 5% 10%',
  border: '1px solid',
  'border-radius': '4px'
})

const Address = styled('div')({
  'margin-left': '10px'
})

const ActionButton = styled(Button)({
  'margin-right': '10px'
})

const Holder = styled('div')({
  padding: '0 10% 10%'
})

const SIGN_IN_TOKEN = gql`
  mutation getToken($addr: String!) {
    getSignInToken(addr: $addr)
  }
`

const AUTHENTICATE = gql`
  mutation auth($sig: String!, $addr: String!, $wcWallet: String) {
    authAccount(signature: $sig, addr: $addr, wcWallet: $wcWallet)
  }
`

const WalletModal = ({ open, handleClose, setPrevLoading }) => {
  const [showWallets, setShowWallets] = useState(false)
  const [pendingWallet, setPendingWallet] = useState(false)
  const { account, active, deactivate, activate, library } = useWeb3React()
  const mixpanel = useMixpanel()
  const [getToken] = useMutation(SIGN_IN_TOKEN)
  const [authAccount] = useMutation(AUTHENTICATE)
  const [curAccount, setCurAccount] = useState()
  const config = useRef({})
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [isMagic, setIsMagic] = useState(false)
  const [isGettingToken, setGettingToken] = useState(false)
  const { isPrevLoading } = usePrevWallet()

  const handleEmail = (event) => {
    if (event && event.target && event.target.value) {
      config.current.email = event.target.value
    }
  }

  const handleError = (error) => {
    if (error instanceof UserRejectedRequestError) {
      return
    }

    const info = {
      type: ERROR_TYPES.login,
      message: error.message
    }
    mixpanel.track('Error', info)
    setErrorMessage('Error connecting to your wallet. If it persists please reload the page and try again.')
    setShowError(true)
  }

  const setLastConnector = (connectorName) => {
    store.set(LAST_CONNECTOR, connectorName)
  }

  useEffect(() => {
    setPrevLoading(isPrevLoading)
  }, [isPrevLoading, setPrevLoading])

  useEffect(() => {
    if (!open) {
      setShowWallets(false)
      setPendingWallet(false)
      setIsMagic(false)
      setGettingToken(false)
    }
  }, [open, setShowWallets])

  const connect = async (option) => {
    const { prepare, setup, connector } = option
    if (!pendingWallet) {
      setPendingWallet(true)

      if (prepare) prepare(connector, config.current)

      if (connector instanceof WalletConnectConnector) {
        // manually reset the connect if a user tries to sign in w/ wc again
        if (connector.walletConnectProvider?.wc?.uri) {
          store.set(connector.walletConnectProvider.wc._sessionStorage.storageId, null)
          connector.walletConnectProvider = undefined
        }

        setLastConnector(CONNECTOR_NAMES.walletConnect)
      } else if (connector instanceof InjectedConnector) {
        setLastConnector(CONNECTOR_NAMES.injected)
      } else if (connector instanceof MagicConnector) {
        store.set(LAST_EMAIL, config.current.email)
        setLastConnector(CONNECTOR_NAMES.magic)
      }

      await activate(connector, handleError)

      if (setup) setup(connector)

      setPendingWallet(false)
    }
  }

  const checkError = useCallback(
    (loginRes) => {
      const { error } = loginRes
      if (error) {
        const info = {
          type: ERROR_TYPES.login,
          message: error.message
        }
        console.log(error.message, 'THE ERROR MESSAGE IN CHECK ERROR WEB3 STATUS')
        mixpanel.track('ERROR', info)
        return true
      }
      return false
    },
    [mixpanel]
  )

  useEffect(() => {
    const fetchToken = async () => {
      setGettingToken(true)
      const tokenRes = await getToken({
        variables: {
          addr: account
        }
      })

      checkError(tokenRes)
      let token = tokenRes.data.getSignInToken
      const signer = library.getSigner()

      let sig
      // signMessage with wc causes issues -.-
      if (library.provider.wc?.protocol === 'wc') {
        // convert token to hex to send
        token = ethers.utils.hexlify(Buffer.from(token, 'utf8'))
        sig = await library.provider.send('personal_sign', [token, account])
      } else {
        sig = await signer.signMessage(token)
      }

      const authRes = await authAccount({
        variables: {
          sig,
          addr: account
        }
      })

      checkError(authRes)
      store.set(`${LOGIN_TOKEN}.${account}`, authRes.data.authAccount)
      mixpanel.identify(account)
      setGettingToken(false)
      handleClose()
    }

    // if the account changes check if we have an auth token for the account
    if (account !== curAccount) {
      // check the provider
      if (library?.provider?.wc?.protocol === 'wc' && WC_PROBLEM_WALLETS.includes(library.provider.wc.peerMeta.name)) {
        store.set(library.provider.wc._sessionStorage.storageId, null)
        deactivate()
        setCurAccount(null)
        setShowError(true)
        setErrorMessage(`Please choose another wallet. ${library.provider.wc.peerMeta.name} cannot sign the message we need to authenticate you.`)
        return
      }

      if (!account) return

      setCurAccount(account)

      const curToken = store.get(`${LOGIN_TOKEN}.${account}`)
      if (!curToken) {
        fetchToken()
      } else {
        handleClose()
      }
    }
  }, [account, curAccount, setCurAccount, getToken, authAccount, library, checkError, mixpanel, deactivate, handleClose])

  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setShowError(false)
  }

  const Container = ({ children }) => (
    <>
      <ModalContainer
        open={open}
        onClose={handleClose}
      >
        <Fade
          in={open}
        >
          <ContentContainer>
            <ExitButton
              onClick={handleClose}
            >
              <Close />
            </ExitButton>
            {children}
          </ContentContainer>
        </Fade>
      </ModalContainer>
      <Snackbar open={showError} autoHideDuration={5000} onClose={closeError}>
        <Alert onClose={closeError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  )

  if (active && !showWallets && !pendingWallet) {
    return (
      <Container>
        <AcctHeader>
          ACCOUNT
        </AcctHeader>
        <AcctBody>
          <Address>
            {shortenAddress(account)}
          </Address>
          <div>
            <ActionButton
              color='secondary'
              onClick={() => setShowWallets(true)}
            >
            CHANGE
            </ActionButton>
          </div>
        </AcctBody>
      </Container>
    )
  }

  return (
    <Container>
      {isGettingToken &&
        <LinearProgress color='secondary' />
      }
      <MagicConnect
        handleConnect={() => {
          connect(MagicData)
          setIsMagic(true)
        }}
        isInitializing={isMagic && pendingWallet}
        handleEmail={handleEmail}
      />
      <OrContainer>
        <i>&mdash;OR&mdash;</i>
      </OrContainer>
      <Holder>
        {
          manualOptions.map((opt, i) => (
            <ManualOption
              key={i}
              wallet={opt}
              connectWallet={() => connect(opt)}
            />
          ))
        }
      </Holder>
    </Container>
  )
}

export default WalletModal

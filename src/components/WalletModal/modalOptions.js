import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import AuthereumLogo from '../../images/wallet-icons/authereum.svg'
import TorusLogo from '../../images/wallet-icons/torus.svg'
import WalletConnectLogo from '../../images/wallet-icons/wallet-connect.svg'

import {
  injected,
  authereum,
  walletconnect,
  torus
} from '../../connectors'

const torusProact = (connector) => {
  connector.torus = undefined
}

const torusReact = (connector) => {
  if (connector.torus) connector.torus.hideTorusButton()
}

const walletConnectProact = (connector) => {
  if (connector.walletConnectProvider?.wc?.uri) connector.walletConnectProvider = undefined
}

const modalOptions = [
  {
    name: 'MetaMask',
    imgSrc: MetaMaskLogo,
    description: 'An ethereum wallet extension built for your browser',
    proact: undefined,
    react: undefined,
    connector: injected
  },
  {
    name: 'Torus',
    imgSrc: TorusLogo,
    description: 'An ethereum wallet that is non-custodial, but lets you sign up using exisiting accounts',
    proact: torusProact,
    react: torusReact,
    connector: torus
  },
  {
    name: 'Authereum',
    imgSrc: AuthereumLogo,
    description: 'An ethereum wallet that is easy to get started with and manages your keys for you',
    proact: undefined,
    react: undefined,
    connector: authereum
  },
  {
    name: 'Wallet Connect',
    imgSrc: WalletConnectLogo,
    description: 'A protocol to bridge your mobile ethereum wallet to the web',
    proact: walletConnectProact,
    react: undefined,
    connector: walletconnect
  }
]

export default modalOptions

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

const modalOptions = [
  {
    name: 'MetaMask',
    imgSrc: MetaMaskLogo,
    description: 'An ethereum wallet extension built for your browser',
    connector: injected
  },
  {
    name: 'Torus',
    imgSrc: TorusLogo,
    description: 'An ethereum wallet that is non-custodial, but lets you sign up using exisiting accounts',
    connector: torus
  },
  {
    name: 'Authereum',
    imgSrc: AuthereumLogo,
    description: 'An ethereum wallet that is easy to get started with and manages your keys for you',
    connector: authereum
  },
  {
    name: 'Wallet Connect',
    imgSrc: WalletConnectLogo,
    description: 'A protocol to bridge your mobile ethereum wallet to the web',
    connector: walletconnect
  }
]

export default modalOptions

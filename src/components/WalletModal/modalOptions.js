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
    description: 'I am comfortable with managing my private keys',
    connector: injected
  },
  {
    name: 'Torus',
    imgSrc: TorusLogo,
    description: 'I am new to crypto and want to make a wallet using OAuth',
    connector: torus
  },
  {
    name: 'Authereum',
    imgSrc: AuthereumLogo,
    description: 'I am new to crypto and want to make a new wallet easily',
    connector: authereum
  },
  {
    name: 'Wallet Connect',
    imgSrc: WalletConnectLogo,
    description: 'I want to connect to a mobile wallet',
    connector: walletconnect
  }
]

export default modalOptions

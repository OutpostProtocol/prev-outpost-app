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
    connector: injected
  },
  {
    name: 'Authereum',
    imgSrc: AuthereumLogo,
    connector: authereum
  },
  {
    name: 'Wallet Connect',
    imgSrc: WalletConnectLogo,
    connector: walletconnect
  },
  {
    name: 'Torus',
    imgSrc: TorusLogo,
    connector: torus
  }
]

export default modalOptions

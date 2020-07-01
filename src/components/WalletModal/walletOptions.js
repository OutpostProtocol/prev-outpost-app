import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import WalletConnectLogo from '../../images/wallet-icons/wallet-connect.svg'
// import AuthereumLogo from '../../images/wallet-icons/authereum.svg'
// import TorusLogo from '../../images/wallet-icons/torus.svg'

import {
  injected,
  walletconnect
  // authereum,
  // torus
} from '../../connectors'

// const torusPrepare = (connector) => {
//   connector.torus = undefined
// }

// const torusSetup = (connector) => {
//   if (connector.torus) connector.torus.hideTorusButton()
// }

const walletConnectPrepare = (connector) => {
  if (connector.walletConnectProvider?.wc?.uri) connector.walletConnectProvider = undefined
}

const walletOptions = [
  {
    name: 'MetaMask',
    imgSrc: MetaMaskLogo,
    description: 'A wallet built for your browser that is secured by a user managed keys',
    prepare: undefined,
    setup: undefined,
    connector: injected
  },
  {
    name: 'Wallet Connect',
    imgSrc: WalletConnectLogo,
    description: 'Connect with a mobile wallet by scanning a qr code',
    prepare: walletConnectPrepare,
    connector: walletconnect
  }
  // {
  //   name: 'Torus',
  //   imgSrc: TorusLogo,
  //   description: 'User friendly wallet with a key management system that operates using your existing accounts',
  //   prepare: torusPrepare,
  //   setup: torusReact,
  //   connector: torus
  // },
  // {
  //   name: 'Authereum',
  //   imgSrc: AuthereumLogo,
  //   description: 'An ethereum wallet that is easy to get started with and manages your keys for you',
  //   prepair: undefined,
  //   setup: undefined,
  //   connector: authereum
  // },
]

export default walletOptions

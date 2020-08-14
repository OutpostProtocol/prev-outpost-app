import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import WalletConnectLogo from '../../images/wallet-icons/wallet-connect.svg'
import AuthereumLogo from '../../images/wallet-icons/authereum.svg'

import {
  injected,
  walletconnect,
  authereum
} from '../../connectors'

const walletConnectPrepare = (connector) => {
  if (connector.walletConnectProvider?.wc?.uri) connector.walletConnectProvider = undefined
}

const authereumPrepare = (connector) => {
  if (connector.authereum) connector.authereum = null
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
    setup: undefined,
    connector: walletconnect
  },
  {
    name: 'Authereum',
    imgSrc: AuthereumLogo,
    description: 'Connect with existing accounts',
    prepare: authereumPrepare,
    setup: undefined,
    connector: authereum
  }
]

export default walletOptions

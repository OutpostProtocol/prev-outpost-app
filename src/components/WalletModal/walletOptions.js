import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import WalletConnectLogo from '../../images/wallet-icons/wallet-connect.svg'

import {
  injected,
  walletconnect
} from '../../connectors'

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
]

export default walletOptions

import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import WalletConnectLogo from '../../images/wallet-icons/wallet-connect.svg'
import FortmaticLogo from '../../images/wallet-icons/fortmatic.svg'

import {
  injected,
  walletconnect,
  magic
} from '../../connectors'

const walletConnectPrepare = (connector) => {
  if (connector.walletConnectProvider?.wc?.uri) connector.walletConnectProvider = undefined
}

const magicPrepare = (connector, options) => {
  const { email } = options
  connector.setEmail(email)
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
    name: 'Magic',
    imgSrc: FortmaticLogo,
    description: '',
    prepare: magicPrepare,
    setup: undefined,
    connector: magic
  }
]

export default walletOptions

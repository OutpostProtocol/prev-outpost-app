import MetaMaskLogo from '../../images/wallet-icons/metamask.svg'
import FortmaticLogo from '../../images/wallet-icons/fortmatic.svg'

import {
  injected,
  magic
} from '../../connectors'

const magicPrepare = (connector, options) => {
  const { email } = options
  connector.setEmail(email)
}

export const MetaMask = {
  name: 'MetaMask',
  imgSrc: MetaMaskLogo,
  prepare: undefined,
  setup: undefined,
  connector: injected
}

export const MagicData = {
  name: 'Magic',
  imgSrc: FortmaticLogo,
  prepare: magicPrepare,
  setup: undefined,
  connector: magic
}

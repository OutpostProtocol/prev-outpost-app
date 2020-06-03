import WalletConnectProvider from '@walletconnect/web3-provider'
import Torus from '@toruslabs/torus-embed'
import Authereum from 'authereum'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: ''
    }
  },
  torus: {
    package: Torus
  },
  authereum: {
    package: Authereum
  }
}

export default {
  network: 'ropsten',
  cacheProvider: false,
  providerOptions
}

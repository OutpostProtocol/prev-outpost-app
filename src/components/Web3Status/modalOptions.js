import WalletConnectProvider from '@walletconnect/web3-provider'
import Torus from '@toruslabs/torus-embed'
import Authereum from 'authereum'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '141da514b2e9412ba2ff5c4023ba75dd'
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
  network: 'mainnet',
  cacheProvider: false,
  providerOptions
}

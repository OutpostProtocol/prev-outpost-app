import WalletConnectProvider from '@walletconnect/web3-provider'
import Torus from '@toruslabs/torus-embed'
import Authereum from 'authereum'

const INFURA_ID = process.env.INFURA_ID

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
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
  cacheProvider: false,
  providerOptions
}

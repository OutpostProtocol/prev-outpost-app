import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Torus from '@toruslabs/torus-embed'
import Authereum from 'authereum'
import Fortmatic from 'fortmatic'
import Squarelink from 'squarelink'

import Web3Modal from 'web3modal'

const ProviderSelector = async () => {
  /*
   * TODO:
   * WalletConnect Infura ID
   * Portis ID
   * Fortmatic key
   * Squarelink ID
   */
  const providerOptions = {
    torus: {
      package: Torus
    },
    authereum: {
      package: Authereum
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'INFURA_ID' // todo
      }
    },
    portis: {
      package: Portis,
      options: {
        id: 'PORTIS_ID' // todo
      }
    },
    fortmatic: {
      package: Fortmatic,
      options: {
        key: 'FORTMATIC_KEY' // todo
      }
    },
    squarelink: {
      package: Squarelink,
      options: {
        id: 'SQUARELINK_ID' // todo
      }
    }
  }

  const web3Modal = new Web3Modal({
    providerOptions
  })

  return await web3Modal.connect()
}

export default ProviderSelector

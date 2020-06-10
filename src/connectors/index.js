import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { TorusConnector } from '@web3-react/torus-connector'

const POLLING_INTERVAL = 10000
const NETWORK_URL = process.env.GATSBY_NETWORK_URL

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
})

export const authereum = new AuthereumConnector({ chainId: 42 })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

// mainnet only
export const torus = new TorusConnector({ chainId: 1 })

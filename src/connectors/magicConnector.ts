import { ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'
import invariant from 'tiny-invariant'

const chainIdToNetwork: { [network: number]: string } = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan'
}

interface MagicConnectorArguments {
  apiKey: string
  chainId: number
}

export class MagicConnector extends AbstractConnector {
  private readonly apiKey: string
  private readonly chainId: number
  private email: string

  public magic: any

  constructor ({ apiKey, chainId }: MagicConnectorArguments) {
    invariant(Object.keys(chainIdToNetwork).includes(chainId.toString()), `Unsupported chainId ${chainId}`)
    super({ supportedChainIds: [chainId] })

    this.apiKey = apiKey
    this.chainId = chainId
  }

  public async activate (): Promise<ConnectorUpdate> {
    if (!this.magic) {
      const { Magic } = await import('magic-sdk')
      this.magic = new Magic(this.apiKey)
    }

    await this.magic.auth.loginWithMagicLink({ email: this.email, showUI: true })

    const { publicAddress } = await this.magic.user.getMetadata()
    return { provider: this.magic.rpcProvider, chainId: this.chainId, account: publicAddress }
  }

  public setEmail (email: string) {
    this.email = email
  }

  public async getProvider (): Promise<any> {
    return this.magic.rpcProvider
  }

  public async getChainId (): Promise<number | string> {
    return this.chainId
  }

  public async getAccount (): Promise<null | string> {
    const { publicAddress } = await this.magic.user.getMetadata()
    return publicAddress
  }

  public deactivate () {}

  public async close () {
    await this.magic.user.logout()
    this.emitDeactivate()
  }
}

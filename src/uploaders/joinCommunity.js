import uploadContractInteraction from './contractInteraction'
import { MEMBER_ADD } from 'outpost-protocol/functionTypes'

export const joinCommunity = async contractTxId => {
  const interaction = {
    contractId: contractTxId,
    input: {
      function: MEMBER_ADD,
      member: window.box.DID
    }
  }

  return await uploadContractInteraction(interaction)
}

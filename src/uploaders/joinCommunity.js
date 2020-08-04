import uploadContractInteraction from './contractInteraction'
import { ADD_MEMBER } from 'outpost-protocol/functionTypes'

export const joinCommunity = async contractTxId => {
  const interaction = {
    contractId: contractTxId,
    input: {
      function: ADD_MEMBER,
      member: window.box.DID
    }
  }

  return await uploadContractInteraction(interaction)
}

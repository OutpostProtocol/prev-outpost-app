import axios from 'axios'
import { ADD_CHILD } from 'outpost-protocol/functionTypes'
import uploadContractInteraction from './contractInteraction'

const CONTRACT_ID = process.env.MAIN_CONTRACT_ID
const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

export const uploadNewCommunity = async com => {
  const createData = {
    name: com.name,
    isOpen: com.isOpen,
    did: window.box.DID
  }

  const childTxId = await createContract(createData)

  const interaction = {
    contractId: CONTRACT_ID,
    input: {
      function: ADD_CHILD,
      communityId: childTxId
    }
  }

  return await uploadContractInteraction(interaction)
}

const createContract = async comData => {
  const createRes = await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/create-community`, comData)

  const txId = createRes.data

  return txId
}

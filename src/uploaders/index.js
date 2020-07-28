import axios from 'axios'
import { ADD_CHILD } from 'outpost-protocol/functionTypes'

const CONTRACT_ID = 'cp1ka-VbZJJj_GOraw9cuJznspR2Vdvcqp71TJ3R03Q'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

export const uploadPost = async (postData, communityTxId) => {
  const payload = {
    postData,
    communityTxId
  }

  const jwt = await window.box._3id.signJWT(payload)

  const uploadData = {
    jwt,
    communityTxId,
    did: window.box.DID
  }

  return await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/blog-post`, uploadData)
}

export const sendCreateTx = async com => {
  const createData = {
    name: com.name,
    isOpen: com.isOpen,
    did: window.box.DID
  }

  const childTxId = await createContract(createData)

  const interaction = {
    nonce: 1,
    contractId: CONTRACT_ID,
    input: {
      function: ADD_CHILD,
      communityId: childTxId
    }
  }

  return await addChildCommunity(interaction)
}

const addChildCommunity = async interaction => {
  const jwt = await window.box._3id.signJWT(interaction)

  const interactionData = {
    jwt,
    communityTxId: interaction.contractId
  }

  const res = await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/contract-interaction`, interactionData)

  return res
}

const createContract = async comData => {
  const createRes = await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/create-community`, comData)

  const txId = createRes.data

  return txId
}

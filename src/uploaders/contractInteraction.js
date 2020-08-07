import axios from 'axios'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

const uploadContractInteraction = async interaction => {
  const jwt = await window.box._3id.signJWT(interaction)

  const uploadData = {
    jwt,
    communityTxId: interaction.contractId
  }

  return await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/contract-interaction`, uploadData)
}

export default uploadContractInteraction

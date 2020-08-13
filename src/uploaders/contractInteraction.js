import axios from 'axios'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE
const IS_PROD = process.env.IS_PROD

const uploadContractInteraction = async interaction => {
  const jwt = await window.box._3id.signJWT(interaction)

  const uploadData = {
    jwt,
    communityTxId: interaction.contractId
  }

  console.log(`THE IS PROD ENV VARIABLE: ${IS_PROD}`)
  console.log(`Posting request to ${ARWEAVE_UPLOAD_SERVICE}`)
  return await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/contract-interaction`, uploadData)
}

export default uploadContractInteraction

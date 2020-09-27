import axios from 'axios'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

export const deletePost = async (txId, communityTxId) => {
  const postData = {
    title: '',
    subtitle: '',
    postText: '',
    parentTxId: txId,
    isDeleted: true
  }

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

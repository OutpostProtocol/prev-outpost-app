import { uploadNewCommunity } from './newCommunity'
import { joinCommunity } from './joinCommunity'
import axios from 'axios'

const ARWEAVE_UPLOAD_SERVICE = process.env.ARWEAVE_UPLOAD_SERVICE

const uploadImage = async (form) => {
  return await axios.post(`${ARWEAVE_UPLOAD_SERVICE}/image-upload`, form, {
    header: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {
  uploadNewCommunity,
  joinCommunity,
  uploadImage
}

import React from 'react'
import { styled } from '@material-ui/core/styles'
import Editor from 'rich-markdown-editor'
import { Input } from '@material-ui/core'
import { useWeb3React } from '@web3-react/core'
import {
  gql,
  useMutation
} from '@apollo/client'

const FormTextField = styled(Input)({
  width: '100%',
  'border-radius': '4px',
  margin: '2vh 0'
})

const TitleContainer = styled('div')({
  padding: '7vh 0 0 0',
  'text-align': 'center'
})

const PostContent = styled(Editor)({
  'margin-top': '30px'
})

const UPLOAD_IMAGE = gql`
  mutation uploadImage($image: Image!, $address: String!) {
    uploadImage(image: $image, address: $address) {
      txId
    }
  }
`

const ContentEditor = ({ title, subtitle, postText, setTitle, setSubtitle, setPostText, setFeaturedImage, isEditing }) => {
  const { account } = useWeb3React()
  const [uploadImageToAR] = useMutation(UPLOAD_IMAGE)

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4))
        }
        resolve(encoded)
      }
      reader.onerror = error => reject(error)
    })
  }

  const imageUpload = async (photoFile) => {
    const rawImage = await getBase64(photoFile)
    const image = {
      data: rawImage,
      mimeType: photoFile.type
    }
    const options = {
      variables: {
        image: image,
        address: account
      }
    }
    console.log('uploading', options)
    const res = await uploadImageToAR(options)
    console.log(res)

    const featuredImgSrc = `https://arweave.net/${res.data.uploadImage.txId}`
    setFeaturedImage(featuredImgSrc)
    return featuredImgSrc
  }

  return (
    <>
      <TitleContainer>
        { isEditing &&
          <h3>
            Edit Post
          </h3>
        }
        <FormTextField
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder='TITLE'
        />
        <FormTextField
          onChange={(event) => setSubtitle(event.target.value)}
          value={subtitle}
          placeholder='SUBTITLE'
        />
      </TitleContainer>
      <PostContent
        headingsOffset={1}
        placeholder='Begin writing your post'
        defaultValue={postText}
        onSave={options => console.log('Save triggered', options)}
        onCancel={() => console.log('Cancel triggered')}
        onShowToast={message => { if (typeof window !== 'undefined') window.alert(message) }}
        onChange={(value) => setPostText(value)}
        uploadImage={async file => await imageUpload(file)}
        autoFocus
      />
    </>
  )
}

export default ContentEditor

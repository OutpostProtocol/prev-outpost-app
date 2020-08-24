import React, {
  useEffect, useState, useRef
} from 'react'
import { styled } from '@material-ui/core/styles'
import makeBlockie from 'ethereum-blockies-base64'

const Avatar = styled('img')({
  'border-radius': '50%',
  'margin-right': '10px',
  '@media only screen and (max-width: 700px)': {
    width: '30px',
    height: '30px'
  },
  '@media only screen and (min-width: 700px)': {
    width: '40px',
    height: '40px'
  }
})

const ProfileImage = ({ userDid }) => {
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/40/40/?blur')
  const isMounted = useRef(true)

  useEffect(() => {
    const retreiveProfile = async () => {
      const img = await makeBlockie(userDid)
      if (isMounted.current) {
        setImageSrc(img)
      }
    }
    retreiveProfile()

    return () => { isMounted.current = false }
  }, [userDid])

  return (
    <Avatar
      src={imageSrc}
      alt='Profile image'
    />
  )
}

export default ProfileImage

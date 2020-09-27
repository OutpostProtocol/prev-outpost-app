import React, {
  useEffect, useState
} from 'react'
import { styled } from '@material-ui/core/styles'
import makeBlockie from 'ethereum-blockies-base64'
import { use3boxProf } from '../../hooks/use3boxProf'

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

const ProfileImage = ({ redirectURL, profAddress }) => {
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/40/40/?blur')
  const { profImage } = use3boxProf(profAddress)

  useEffect(() => {
    const setProfileImage = async () => {
      if (!profAddress) return
      const img = profImage || await makeBlockie(profAddress)
      setImageSrc(img)
    }

    setProfileImage()
  }, [profAddress, profImage])

  return (
    <>
      { redirectURL === null
        ? <Avatar
          src={imageSrc}
          alt='Profile image'
        />
        : <a
          rel='noreferrer'
          target='_blank'
          href={redirectURL}
        >
          <Avatar
            src={imageSrc}
            alt='Profile image'
          />
        </a>
      }
    </>
  )
}

export default ProfileImage

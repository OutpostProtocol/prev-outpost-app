import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { getProfile } from '3box/lib/api'
import { styled } from '@material-ui/core/styles'
import makeBlockie from 'ethereum-blockies-base64'

import { shortenAddress } from '../../utils'

const ProfileImage = styled('img')({
  width: '40px',
  height: '40px',
  'border-radius': '50%',
  'margin-right': '10px'
})

const ProfileContainer = styled('span')({
  display: 'inline-flex',
  'align-items': 'center'
})

const ProfileName = styled('h4')({
  'font-weight': 100
})

const Profile = ({ address, showName }) => {
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/40/40/?blur')
  const [name, setName] = useState(shortenAddress(address))
  const isMounted = useRef(true)

  useEffect(() => {
    const retreiveProfile = async () => {
      let img
      const profile = await getProfile(address)
      if (profile.image) img = await getImgSrc(profile, address)
      else img = await makeBlockie(address)

      if (isMounted.current) {
        setImageSrc(img)
        if (profile.name) setName(profile.name)
      }
    }

    retreiveProfile()

    return () => { isMounted.current = false }
  }, [address])

  const getImgSrc = (profile, address) => {
    const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
    return `https://ipfs.infura.io/ipfs/${hash}`
  }

  return (
    <ProfileContainer>
      <ProfileImage
        src={imageSrc}
        alt='Profile'
      />
      { showName &&
        <ProfileName>
          {name}
        </ProfileName>
      }
    </ProfileContainer>
  )
}

export default Profile

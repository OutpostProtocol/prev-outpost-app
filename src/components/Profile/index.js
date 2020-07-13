import React, {
  useState,
  useMemo
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
  const [imageSrc, setImageSrc] = useState('http://via.placeholder.com/40')
  const [name, setName] = useState(shortenAddress(address))

  useMemo(() => {
    const retreiveProfile = async () => {
      const profile = await getProfile(address)
      if (profile.name) setName(profile.name)

      if (profile.image) setImageSrc(await getImgSrc(profile, address))
      else setImageSrc(await makeBlockie(address))
    }

    retreiveProfile()
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

import React, {
  useState,
  useRef,
  useEffect
} from 'react'
import { styled } from '@material-ui/core/styles'
import makeBlockie from 'ethereum-blockies-base64'

import { useUser } from '../../hooks'
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
  const isMounted = useRef(true)
  const [imageSrc, setImageSrc] = useState('https://picsum.photos/40/40/?blur')
  const { data } = useUser(address)
  const name = (data && data.user && data.user.name) ? data.user.name : shortenAddress(address)

  useEffect(() => {
    const retreiveProfile = async () => {
      const img = await makeBlockie(address)
      if (isMounted.current) {
        setImageSrc(img)
      }
    }
    retreiveProfile()

    return () => { isMounted.current = false }
  }, [address])

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

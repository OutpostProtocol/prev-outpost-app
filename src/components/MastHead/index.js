import React, {
  useEffect, useState
} from 'react'
import { styled } from '@material-ui/core/styles'
import Box from '3box'

import { useCommunity } from '../../hooks'

const Container = styled('div')({
  'background-color': '#F2F2F2',
  width: '70vw',
  margin: '80px auto 0',
  padding: '25px'
})

const Header = styled('div')({
  display: 'flex'
})

const HeaderImages = styled('div')({})

const CommunityImage = styled('img')({
  'border-radius': '50%',
  height: '100px'
})

const ProfileImage = styled('img')({
  height: '40px',
  'border-radius': '50%',
  position: 'relative',
  bottom: '-20px',
  right: '70px'
})

const Name = styled('h1')({
  'font-size': '2.5em'
})

const Author = styled('div')({})

const CommunityInfo = styled('div')({
  'margin-top': '20px',
  'margin-left': '20px'
})

const Description = styled('div')({
  margin: '30px 0'
})

const MastHead = () => {
  const { data, loading, error } = useCommunity()
  const [creatorImg, setCreatorImg] = useState(null)
  const [creatorName, setCreatorName] = useState(null)

  useEffect(() => {
    if (data && data.community) {
      const setProfile = async () => {
        const profile = await Box.getProfile(creator)
        const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
        if (hash) {
          const imgSrc = `https://ipfs.infura.io/ipfs/${hash}`
          setCreatorImg(imgSrc)
        }

        if (profile.name) {
          setCreatorName(profile.name)
        }
      }

      const { creator } = data.community[0]

      setProfile()
    }
  }, [data])

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const { image, name, description } = data.community[0]

  console.log(data.community[0], 'THE COMMUNITY DATA')

  return (
    <Container>
      <Header>
        <HeaderImages>
          <CommunityImage src={image} alt={name} />
          {creatorImg &&
            <ProfileImage src={creatorImg} alt={`${name} Creator`} />
          }
        </HeaderImages>
        <CommunityInfo>
          <Name>
            {name}
          </Name>
          {creatorName &&
          <Author>
            By {creatorName}
          </Author>
          }
          <Description>
            {description}
          </Description>
        </CommunityInfo>
      </Header>
    </Container>
  )
}

export default MastHead

import React, {
  useEffect, useState
} from 'react'
import { styled } from '@material-ui/core/styles'
import Box from '3box'
import { Button } from '@material-ui/core'
import Iframe from 'react-iframe'

import { useCommunity } from '../../hooks'

const Container = styled('div')({
  'background-color': '#F2F2F2',
  width: '70vw',
  margin: '80px auto 0'
})

const PaddingContainer = styled('div')({
  padding: '25px',
  display: 'flex',
  'justify-content': 'space-between'
})

const Header = styled('div')({
  display: 'flex'
})

const HeaderImages = styled('div')({
  width: '100px'
})

const CommunityImage = styled('img')({
  'border-radius': '50%',
  width: '100px',
  height: '100px'
})

const ProfileImage = styled('img')({
  height: '40px',
  'border-radius': '50%',
  position: 'relative',
  bottom: '20px',
  left: '30px'
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

const BuyContainer = styled('div')({})

const FrameWrapper = styled('div')({
  'min-width': '100vw',
  height: '100vh',
  left: 0,
  top: 0,
  'z-index': 9999,
  'background-color': 'rgba(0, 0, 0, 0.7)',
  position: 'fixed',
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center',
  '&:hover': {
    cursor: 'pointer'
  },
  '@media screen and (max-width: 440px)': {
    'padding-top': '20px'
  }
})

const CloseIcon = styled('div')({
  position: 'absolute',
  color: 'white',
  'font-size': '30px',
  top: '20px',
  right: '20px'
})

const FrameBorder = styled('div')({
  'border-radius': '26px',
  'margin-bottom': '20px',
  overflow: 'hidden'
})

const MastHead = () => {
  const { data, loading, error } = useCommunity()
  const [creatorImg, setCreatorImg] = useState(null)
  const [creatorName, setCreatorName] = useState(null)
  const [showModal, toggleModal] = useState(false)

  useEffect(() => {
    if (data && data.community) {
      const setProfile = async () => {
        const profile = await Box.getProfile(owner)
        const hash = profile.image ? profile.image[0].contentUrl['/'] : ''
        if (hash) {
          const imgSrc = `https://ipfs.infura.io/ipfs/${hash}`
          setCreatorImg(imgSrc)
        }

        if (profile.name) {
          setCreatorName(profile.name)
        }
      }

      const { owner } = data.community[0]

      setProfile()
    }
  }, [data])

  if (loading) return null
  if (error) return `Error! ${error.message}`

  const { imageTxId, name, description, tokenSymbol, tokenAddress } = data.community[0]

  return (
    <Container>
      <PaddingContainer>
        {showModal && (
          <FrameWrapper
            onClick={() => {
              toggleModal(false)
            }}
          >
            <CloseIcon>✕</CloseIcon>
            <FrameBorder>
              <Iframe
                url={`https://uniswap.exchange/?outputCurrency=${tokenAddress}`}
                height={'660px'}
                width={'400px'}
                id="myId"
                frameBorder="0"
                style={{ border: 'none', outline: 'none' }}
                display="initial"
                position="relative"
              />
            </FrameBorder>
          </FrameWrapper>
        )}
        <Header>
          <HeaderImages>
            <CommunityImage src={`https://arweave.net/${imageTxId}`} alt={name} />
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
        <BuyContainer>
          <Button
            variant='contained'
            color='secondary'
            disableElevation
            onClick={() => toggleModal(true)}
          >
          BUY ${tokenSymbol}
          </Button>
        </BuyContainer>
      </PaddingContainer>
    </Container>
  )
}

export default MastHead

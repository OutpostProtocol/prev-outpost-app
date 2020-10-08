import React, {
} from 'react'
import { styled } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import {
  CreateOutlined, ChevronLeft
} from '@material-ui/icons'
import { useCommunity } from '../../hooks'
import { useWeb3React } from '@web3-react/core'
import { navigate } from '@reach/router'

import ProfileImage from '../Profile/ProfileImage'
import Web3Status from '../Web3Status'

const CreateButton = styled(IconButton)({
  'margin-right': '10px'
})

const ProfileContainer = styled('div')({
  display: 'flex',
  padding: '10px 0',
  'align-items': 'center',
  'justify-content': 'flex-end'
})

const ImgContainer = styled('div')({
  display: 'flex',
  'align-items': 'center'
})

const Toolbar = ({ backPath }) => {
  const { active, account } = useWeb3React()

  const handleOpenEditor = () => {
    navigate('/editor')
  }

  return (
    <CommonToolbar
      backPath={backPath}
    >
      {active &&
        <ImgContainer>
          {true && // disable until we have check that they are an editor
            <CreateButton
              onClick={handleOpenEditor}
            >
              <CreateOutlined />
            </CreateButton>
          }
          <ProfileImage
            userAddress={account}
            redirectURL={`https://3box.io/${account}`}
          />
        </ImgContainer>
      }
      <Web3Status />
    </CommonToolbar>
  )
}

const ToolbarContainer = styled('div')({
  position: 'absolute',
  top: 0,
  height: '60px',
  display: 'flex',
  width: '99vw',
  'justify-content': 'space-between'
})

const ImageContainer = styled('div')({
  width: '45px'
})

const CommunityImage = styled('img')({
  height: '45px',
  width: '100%',
  'margin-top': '5px',
  'border-radius': '4px'
})

const CurCommunity = styled('div')({
  display: 'flex',
  'align-items': 'center',
  'margin-left': '3vw'
})

const CommunityName = styled('h1')({
  'font-size': '1.25em',
  'margin-left': '10px',
  '@media only screen and (max-width: 400px)': {
    display: 'none'
  }
})

const BackButton = styled(IconButton)({
  margin: '5px',
  top: '0',
  left: '0',
  'z-index': 2
})

const LeftToolbar = styled('div')({
  display: 'flex'
})

const CommonToolbar = ({ children, backPath }) => {
  const { data, loading, error } = useCommunity()

  if (loading || error) return null
  const { imageTxId, name } = data?.community[0]

  return (
    <ToolbarContainer>
      <LeftToolbar>
        {backPath &&
          <BackButton
            color="inherit"
            aria-label="Go back"
            edge="end"
            onClick={() => navigate(backPath)}
          >
            <ChevronLeft />
          </BackButton>
        }
        <CurCommunity>
          <ImageContainer>
            { imageTxId &&
            <CommunityImage
              src={`https://arweave.net/${imageTxId}`}
              alt={name}
            />
            }
          </ImageContainer>
          <CommunityName>
            {name}
          </CommunityName>
        </CurCommunity>
      </LeftToolbar>
      <ProfileContainer>
        {children}
      </ProfileContainer>
    </ToolbarContainer>
  )
}

export default Toolbar

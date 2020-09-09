import React, {
} from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import { IconButton } from '@material-ui/core'
import { CreateOutlined } from '@material-ui/icons'
import Loadable from '@loadable/component'

import ProfileImage from '../Profile/ProfileImage'

const LoadableWeb3Status = Loadable(() => import('../Web3Status'))

const CreateButton = styled(IconButton)({
  float: 'right',
  'margin-left': 'auto',
  'margin-right': '10px'
})

const ToolbarContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: '70vw',
  width: '29vw',
  padding: '10px 0',
  'align-items': 'center',
  'justify-content': 'space-between'
})

const Toolbar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const did = useSelector(state => state.did)

  const handleOpenEditor = () => {
    navigate('/editor')
  }

  if (!isLoggedIn) {
    return (
      <ToolbarContainer>
        <LoadableWeb3Status />
      </ToolbarContainer>
    )
  }

  return (
    <ToolbarContainer>
      <CreateButton
        onClick={handleOpenEditor}
      >
        <CreateOutlined />
      </CreateButton>
      <ProfileImage
        userDid={did}
      />
    </ToolbarContainer>
  )
}

export default Toolbar

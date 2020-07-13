import React from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  TextField
} from '@material-ui/core'
import {
  CreateOutlined,
  Search
} from '@material-ui/icons'
import { useWeb3React } from '@web3-react/core'

import Profile from '../Profile'

const CreateButton = styled(IconButton)({
  float: 'right',
  'margin-left': 'auto',
  'margin-right': '10px'
})

const ToolbarContainer = styled('div')({
  display: 'flex',
  position: 'sticky',
  top: 0,
  width: '100%',
  padding: '10px 0',
  'align-items': 'center',
  'justify-content': 'space-between',
  'background-color': 'rgba(255, 255, 255, 0.9)'
})

const ProfileContainer = styled(Profile)({
  float: 'right',
  'margin-left': 'auto'
})

const SearchBar = styled(TextField)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '300px'
})

const Toolbar = () => {
  const { account } = useWeb3React()

  const handleOpenEditor = () => {
    navigate('/editor')
  }

  return (
    <ToolbarContainer>
      <SearchBar
        id='outlined-basic'
        variant='outlined'
        InputProps={{
          endAdornment: (
            <Search />
          )
        }}
      />
      <CreateButton
        onClick={handleOpenEditor}
      >
        <CreateOutlined />
      </CreateButton>
      <ProfileContainer
        address={account}
        showName={false}
      />
    </ToolbarContainer>
  )
}

export default Toolbar

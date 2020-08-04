import React, {
  useState,
  useEffect
} from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import {
  IconButton,
  TextField
} from '@material-ui/core'
import { CreateOutlined } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import { useWeb3React } from '@web3-react/core'

import { useCommunities } from '../../hooks'

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

const SearchBar = styled(Autocomplete)({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '300px',
  'z-index': 5000
})

const ProfileContainer = styled(Profile)({
  float: 'right',
  'margin-left': 'auto'
})

const Toolbar = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const { account } = useWeb3React()
  const { data } = useCommunities()
  const communities = data.Community

  useEffect(() => {
    const handleSelection = (community) => {
      const url = '/community/' + community.txId
      navigate(url, { state: { community } })
    }

    if (selectedCommunity && selectedCommunity.txId) {
      handleSelection(selectedCommunity)
    }
  })

  const handleOpenEditor = () => {
    navigate('/editor')
  }

  return (
    <ToolbarContainer>
      <SearchBar
        id="community-search"
        options={communities}
        value={selectedCommunity}
        onChange={(_, selection) => setSelectedCommunity(selection) }
        getOptionLabel={(option) => option.name}
        autoComplete
        includeInputInList
        renderInput={(params) =>
          <TextField
            {...params}
            variant='outlined'
            label='Search for communities'
            margin="normal"
          />}
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

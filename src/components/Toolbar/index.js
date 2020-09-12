import React, {
  useState,
  useEffect
} from 'react'
import { navigate } from 'gatsby'
import { styled } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import {
  IconButton,
  TextField
} from '@material-ui/core'
import { CreateOutlined } from '@material-ui/icons'
import { Autocomplete } from '@material-ui/lab'
import Loadable from '@loadable/component'

import { useCommunities } from '../../hooks'
const LoadableProfileImage = Loadable(() => import('../Profile/ProfileImage'))

const CreateButton = styled(IconButton)({
  float: 'right',
  'margin-left': 'auto',
  'margin-right': '10px'
})

const ToolbarContainer = styled('div')({
  display: 'flex',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '30vw',
  padding: '10px 0',
  'align-items': 'center',
  'justify-content': 'space-between'
})

const SearchBar = styled(Autocomplete)({
  width: '15vw',
  position: 'absolute',
  top: '5px'
})

const Toolbar = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const { data } = useCommunities()
  const communities = data && data.community
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  const did = useSelector(state => state.did)

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

  if (!isLoggedIn) return null

  return (
    <ToolbarContainer>
      <SearchBar
        id="community-search"
        options={communities || []}
        value={selectedCommunity}
        onChange={(_, selection) => setSelectedCommunity(selection) }
        getOptionLabel={(option) => option.name}
        autoComplete
        includeInputInList
        renderInput={(params) =>
          <TextField
            {...params}
            label='SEARCH'
            margin="none"
          />}
      />
      <CreateButton
        onClick={handleOpenEditor}
      >
        <CreateOutlined />
      </CreateButton>
      <LoadableProfileImage
        userDid={did}
      />
    </ToolbarContainer>
  )
}

export default Toolbar

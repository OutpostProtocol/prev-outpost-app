import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@material-ui/core/styles'

import CommunityTile from '../CommunityTile'

const ViewContainer = styled('div')({
  'margin-top': '10px'
})

const CommunityView = () => {
  const communities = useSelector(state => state.communities)

  return (
    <ViewContainer>
      {communities && communities.map((community, i) => {
        return (
          <CommunityTile
            community={community}
            key={i}
          />
        )
      })}
    </ViewContainer>
  )
}

export default CommunityView

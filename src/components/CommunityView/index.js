import React from 'react'
import { useSelector } from 'react-redux'

import CommunityTile from '../CommunityTile'

const CommunityView = () => {
  const communities = useSelector(state => state.communities)

  return (
    <div>
      {communities && communities.map((community, i) => {
        return (
          <CommunityTile
            community={community}
            key={i}
          />
        )
      })}
    </div>
  )
}

export default CommunityView

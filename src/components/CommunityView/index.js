import React from 'react'
import { useSelector } from 'react-redux'

import CommunityTile from '../CommunityTile'

const CommunityView = () => {
  const communities = useSelector(state => state.communities)

  return (
    <>
      {communities && communities.map((com, i) => {
        return (
          <CommunityTile
            name={com.name}
            abbr={com.abbr}
            key={i}
          />
        )
      })}
    </>
  )
}

export default CommunityView

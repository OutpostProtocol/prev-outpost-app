import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TOGGLE_VISIBILITY } from '../../redux/actionTypes'

import CommunityTile from '../CommunityTile'

const CommunityView = () => {
  const communities = useSelector(state => state.communities)
  const dispatch = useDispatch()

  const handleCommunityToggle = (event) => {
    if (event && event.target.value) {
      const address = event.target.value
      dispatch({ type: TOGGLE_VISIBILITY, address })
    }
  }

  return (
    <>
      {communities && communities.map((com, i) => {
        return (
          <CommunityTile
            community={com}
            key={i}
            callback={handleCommunityToggle}
          />
        )
      })}
    </>
  )
}

export default CommunityView

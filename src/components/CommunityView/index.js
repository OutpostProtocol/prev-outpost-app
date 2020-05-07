import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CommunityTile from '../CommunityTile'
import { REMOVE_COMMUNITY_ASYNC, TOGGLE_VISIBILITY } from '../../redux/actionTypes'
import { COMMUNITIES } from '../../constants'

const CommunityView = () => {
  const communities = useSelector(state => state.communities)
  const dispatch = useDispatch()

  const handleCommunityToggle = (event) => {
    if (event && event.target.value) {
      const address = event.target.value
      dispatch({ type: TOGGLE_VISIBILITY, address })
    }
  }

  const removeCom = async (abbr) => {
    let boxCommunities = await window.space.public.get(COMMUNITIES)

    boxCommunities = boxCommunities.filter(com => com.abbr !== abbr)
    await window.space.public.set(COMMUNITIES, boxCommunities)

    dispatch({ type: REMOVE_COMMUNITY_ASYNC, abbr })
  }

  return (
    <div>
      {communities && communities.map((com, i) => {
        return (
          <CommunityTile
            community={com}
            remove={removeCom}
            handleToggle={handleCommunityToggle}
            key={i}
          />
        )
      })}
    </div>
  )
}

export default CommunityView

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CommunityTile from '../CommunityTile'
import { REMOVE_COMMUNITY } from '../../redux/actionTypes'
import { COMMUNITIES } from '../../constants'
import styles from './index.module.css'

const CommunityView = () => {
  const communities = useSelector(state => state.communities)
  const dispatch = useDispatch()

  const removeCom = async (abbr) => {
    let boxCommunities = await window.space.public.get(COMMUNITIES)

    boxCommunities = boxCommunities.filter(com => com.abbr !== abbr)
    await window.space.public.set(COMMUNITIES, boxCommunities)

    dispatch({ type: REMOVE_COMMUNITY, abbr })
  }

  return (
    <div className={styles.viewContainer}>
      {communities && communities.map((com, i) => {
        return (
          <CommunityTile
            name={com.name}
            abbr={com.abbr}
            remove={removeCom}
            key={i}
          />
        )
      })}
    </div>
  )
}

export default CommunityView

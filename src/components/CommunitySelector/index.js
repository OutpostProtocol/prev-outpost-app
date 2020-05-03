import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import styles from './index.module.css'

const CommunitySelector = () => {
  const communities = useSelector(state => state.communities)
  const [activeCommunity, setActiveCommunity] = useState(communities[0])

  const handleCommunitySwitch = (event) => {
    if (event) {
      setActiveCommunity(event.target.value)
    }
  }

  return (
    <Select
      labelId='commuunity-selector'
      className={styles.selector}
      value={activeCommunity}
      onChange={handleCommunitySwitch}
    >
      {communities.map((com, i) => {
        return (
          <MenuItem
            key={i}
            value={com}>
            {com.name}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default CommunitySelector

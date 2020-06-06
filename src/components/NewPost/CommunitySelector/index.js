import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import styles from './index.module.css'

const CommunitySelector = ({ handleSelection }) => {
  const communities = useSelector(state => state.communities.length !== 0 ? state.communities : [])
  const [activeCommunity, setActiveCommunity] = useState(communities[0])
  const switchActiveCommunity = (event) => {
    if (event && event.target.value) {
      setActiveCommunity(event.target.value)
    }
    handleSelection(event)
  }

  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)

  return (
    <Select
      className={styles.selector}
      value={activeCommunity}
      onChange={switchActiveCommunity}
    >
      {communities.map((com, i) => {
        return (
          <MenuItem
            key={i}
            value={com}>
            {capitalize(com.name)}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export default CommunitySelector

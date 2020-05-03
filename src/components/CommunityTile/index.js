import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './index.module.css'

const CommunityTile = ({ name, abbr }) => {
  return (
    <div
      className={styles.communityTileContainer}
    >
      <Checkbox
        checked={true}
        inputProps={{ 'aria-label': 'Display community in feed?' }}>
      </Checkbox>
      {name} ({abbr})
    </div>
  )
}

export default CommunityTile

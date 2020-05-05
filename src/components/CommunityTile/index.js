import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

import styles from './index.module.css'

const CommunityTile = ({ community, callback }) => {
  return (
    <div
      className={styles.communityTileContainer}
    >
      <Checkbox
        checked={community.visible}
        onChange={callback}
        value={community.address}
        inputProps={{ 'aria-label': 'Display community in feed?' }}>
      </Checkbox>
      {community.name} ({community.abbr})
    </div>
  )
}

export default CommunityTile

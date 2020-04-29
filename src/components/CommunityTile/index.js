import React from 'react'

import styles from './index.module.css'

const CommunityTile = ({ name }) => {
  return (
    <div
      className={styles.communityTileContainer}
    >
      {name}
    </div>
  )
}

export default CommunityTile

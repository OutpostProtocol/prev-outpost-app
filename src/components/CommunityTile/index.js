import React from 'react'

import styles from './index.module.css'

const CommunityTile = ({ name }) => {
  const switchCommunities = async () => {
    const activeSpace = await window.box.openSpace(name)
    window.activeSpace = activeSpace
    console.log(activeSpace, 'ACTIVE COMMUNITY')
  }

  return (
    <div
      className={styles.communityTileContainer}
      onClick={switchCommunities}>
      {name}
    </div>
  )
}

export default CommunityTile

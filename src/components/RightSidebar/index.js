import React from 'react'
import Web3Status from '../Web3Status'

import styles from './index.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebarContainer}>
      <Web3Status />
    </div>
  )
}

export default Sidebar

import React from 'react'
import { useTheme } from '@material-ui/core/styles'

import Web3Status from '../Web3Status'
import styles from './index.module.css'

const Sidebar = () => {
  const theme = useTheme()
  return (
    <div
      className={styles.sidebarContainer}
      style={{
        width: `${theme.sidebarWidth}vw`
      }}
    >
      <Web3Status />
    </div>
  )
}

export default Sidebar

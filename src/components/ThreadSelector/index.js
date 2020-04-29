import React from 'react'
import styles from './index.module.css'

const ThreadSelector = ({ threads }) => {
  return (
    <select className={styles.selector}>
      {threads.map((threadName, i) => {
        return (
          <option key={i}>
            {threadName}
          </option>
        )
      })}
    </select>
  )
}

export default ThreadSelector

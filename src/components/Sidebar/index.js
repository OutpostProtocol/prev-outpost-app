import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import styles from './index.module.css'

const Sidebar = ({ siteTitle }) => {
  return (
    <div>
      <div className={styles.titleContainer}>
        <Link to='/'>{siteTitle}</Link>
      </div>
      {/* search for new communities */}
      {/* list of existing communities */}
    </div>
  )
}

Sidebar.propTypes = {
  siteTitle: PropTypes.string,
}

Sidebar.defaultProps = {
  siteTitle: '',
}

export default Sidebar

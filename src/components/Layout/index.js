/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'

import '../../utils/styles/global.css'
import styles from './index.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

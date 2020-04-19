/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'

import '../../utils/global.css'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333333'
    },
    background: {
      default: '#fafafa'
    }
  },
  typography: {
    fontFamily: 'Roboto'
  }
})

const Layout = ({ children }) => {
  return (
    <StylesProvider injectFirst >
      <ThemeProvider theme={theme}>
        <main>{children}</main>
      </ThemeProvider>
    </StylesProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

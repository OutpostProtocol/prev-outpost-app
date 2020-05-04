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
  },
  sidebarWidth: 22 // vw
})

const Layout = ({ children }) => {
  return (
    <React.StrictMode>
      <StylesProvider injectFirst >
        <ThemeProvider theme={theme}>
          <main
            style={{
              height: '100vh',
              width: '100vw',
              position: 'absolute',
              top: '0',
              left: '0'
            }}
          >
            {children}
          </main>
        </ThemeProvider>
      </StylesProvider>
    </React.StrictMode>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

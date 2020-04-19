import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import '../../utils/global.css'

function getLibrary (provider) {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = 10000
  return library
}

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
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <StylesProvider injectFirst >
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>
        </StylesProvider>
      </Web3ReactProvider>
    </React.StrictMode>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout

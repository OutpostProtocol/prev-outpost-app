import React from 'react'
import {
  ThemeProvider,
  StylesProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink
} from '@apollo/client'
import { ELEMENT_ID } from './src/constants'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import fetch from 'isomorphic-fetch'
import Box from '3box'

import './src/static/global.css'

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.OUTPOST_API,
    fetch
  }),
  cache: new InMemoryCache()
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a1a1a'
    },
    secondary: {
      main: '#3D5AFE',
      contrastText: '#f3f2f2'
    },
    info: {
      main: '#c4c4c4'
    },
    background: {
      default: '#f3f2f2'
    }
  },
  typography: {
    fontFamily: 'Favorit',
    button: {
      textTransform: 'none'
    }
  },
  zIndex: {
    snackbar: 2300,
    modal: 0
  }
})

const getLibrary = (provider, connector) => {
  window.web3 = new ethers.providers.Web3Provider(provider)
  return window.web3
}

export const wrapRootElement = ({ element }) => {
  window.threeBox = Box

  return (
    <React.StrictMode>
      <ApolloProvider client={client} >
        <StylesProvider injectFirst >
          <ThemeProvider theme={theme}>
            <Web3ReactProvider getLibrary={getLibrary}>
              <main
                style={{
                  height: '100%',
                  width: '100%',
                  top: '0',
                  left: '0'
                }}
              >
                {element}
              </main>
            </Web3ReactProvider>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </React.StrictMode>
  )
}

export const onInitialClientRender = () => {
  if (process.env.BUILD_STAGE !== 'build-javascript') {
    return
  }

  // Remove the server-side injected state.
  const preloadedStateEl = document.getElementById(ELEMENT_ID)
  if (preloadedStateEl) {
    preloadedStateEl.parentNode.removeChild(preloadedStateEl)
  }
}

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
import { setContext } from '@apollo/client/link/context'

import './src/static/global.css'

const authLink = setContext(async (_, { headers }) => {
  if (!window || !window.box) return headers

  const jwt = await window.box._3id.signJWT('Access token')
  return {
    headers: {
      ...headers,
      authorization: jwt
    }
  }
})

const httpLink = new HttpLink({
  uri: process.env.OUTPOST_API,
  fetch
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1a1a1a'
    },
    secondary: {
      main: '#7000FF',
      contrastText: '#f1f1f1'
    },
    info: {
      main: '#c4c4c4'
    },
    background: {
      default: '#f1f1f1'
    }
  },
  typography: {
    fontFamily: 'Roboto',
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
                  left: '0',
                  'overflow-x': 'hidden'
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

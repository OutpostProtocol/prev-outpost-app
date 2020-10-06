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
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'
import fetch from 'isomorphic-fetch'
import { AuthProvider } from './src/context/Auth'

import './src/static/global.css'

const httpLink = new HttpLink({
  uri: process.env.OUTPOST_API,
  fetch
})

const client = new ApolloClient({
  link: httpLink,
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
              <AuthProvider >
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
              </AuthProvider>
            </Web3ReactProvider>
          </ThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </React.StrictMode>
  )
}

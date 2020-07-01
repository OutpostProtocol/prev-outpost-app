import React from 'react'
import { Provider } from 'react-redux'
import {
  ThemeProvider,
  StylesProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import createStore, { runSaga } from './src/redux/store'
import {
  ELEMENT_ID,
  GLOBAL_KEY
} from './src/constants'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

import './src/utils/global.css'

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
  zIndex: {
    snackbar: 2300,
    modal: 0
  },
  sidebarWidth: 22 // vw
})

const getLibrary = (provider, connector) => {
  window.web3 = new ethers.providers.Web3Provider(provider)
  return window.web3
}

export const wrapRootElement = ({ element }) => {
  const store = createStore(window[GLOBAL_KEY])
  runSaga()

  return (
    <React.StrictMode>
      <Provider store={store}>
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

      </Provider>
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

import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, StylesProvider, createMuiTheme } from '@material-ui/core/styles'
import createStore, { runSaga } from './src/redux/store'
import { ELEMENT_ID, GLOBAL_KEY } from './src/constants'

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
  sidebarWidth: 22 // vw
})

export const wrapRootElement = ({ element }) => {
  const store = createStore(window[GLOBAL_KEY])
  runSaga()

  return (
    <React.StrictMode>
      <Provider store={store}>
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
              {element}
            </main>
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

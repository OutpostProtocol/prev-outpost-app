import React from 'react'
import { Provider } from 'react-redux'
import createStore, { runSaga } from './src/redux/store'
import { ELEMENT_ID, GLOBAL_KEY } from './src/constants'

export const wrapRootElement = ({ element }) => {
  const store = createStore(window[GLOBAL_KEY])
  runSaga()

  return <Provider store={store}>{element}</Provider>
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

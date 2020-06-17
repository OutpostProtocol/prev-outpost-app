import {
  createStore,
  applyMiddleware
} from 'redux'
import createSagaMiddleWare from 'redux-saga'

import rootSaga from './sagas'
import app from './reducers'

const sagaMiddleWare = createSagaMiddleWare()

export default preloadedState => {
  return createStore(
    app,
    preloadedState,
    applyMiddleware(sagaMiddleWare)
  )
}

export const runSaga = () => sagaMiddleWare.run(rootSaga)

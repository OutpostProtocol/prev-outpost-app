import { createStore } from 'redux'
import app from './reducers'

export default preloadedState => {
  return createStore(app, preloadedState)
}

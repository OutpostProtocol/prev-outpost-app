import { combineReducers } from 'redux'
import {
  SET_IS_LOGGED_IN,
  SET_IS_LOADING,
  SET_DID
} from '../actionTypes'

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.isLoggedIn
    default:
      return state
  }
}

const did = (state = null, action) => {
  switch (action.type) {
    case SET_DID:
      return action.did
    default:
      return state
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

const app = combineReducers({
  isLoggedIn,
  isLoading,
  did
})

export default app

import { combineReducers } from 'redux'
import { SET_ETHERS, SET_IS_LOGGED_IN } from '../actionTypes'

const ethers = (state = {}, action) => {
  switch (action.type) {
    case SET_ETHERS:
      return {
        ...state,
        ...action.library
      }
    default:
      return state
  }
}

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case SET_IS_LOGGED_IN:
      return action.isLoggedIn
    default:
      return state
  }
}

const app = combineReducers({
  ethers,
  isLoggedIn
})

export default app

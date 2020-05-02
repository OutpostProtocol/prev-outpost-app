import { combineReducers } from 'redux'
import { SET_ETHERS, SET_IS_LOGGED_IN, SET_COMMUNITIES, ADD_COMMUNITY } from '../actionTypes'
import { DEFAULT_COMMUNITY } from '../../constants'

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

const communities = (state = [DEFAULT_COMMUNITY], action) => {
  switch (action.type) {
    case SET_COMMUNITIES:
      return [
        ...action.communities
      ]
    case ADD_COMMUNITY:
      return [
        ...state,
        action.community
      ]
    default:
      return state
  }
}

const app = combineReducers({
  ethers,
  isLoggedIn,
  communities
})

export default app

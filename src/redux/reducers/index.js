import { combineReducers } from 'redux'
import {
  SET_ADDR, SET_IS_LOGGED_IN, SET_COMMUNITIES, ADD_COMMUNITY
} from '../actionTypes'
import { DEFAULT_COMMUNITY } from '../../constants'

const address = (state = {}, action) => {
  switch (action.type) {
    case SET_ADDR:
      return action.address
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
  address,
  isLoggedIn,
  communities
})

export default app
